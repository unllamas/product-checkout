export async function getLnurlp(lightningAddress: string) {
  try {
    const [username, domain] = lightningAddress.split('@');

    if (!username || !domain) {
      throw new Error('Invalid Lightning Address format');
    }

    const url = `https://${domain}/.well-known/lnurlp/${username}`;
    const data = await fetch(url).then((res) => res.json());

    return data;
  } catch (error) {
    console.error('Error fetching LNURLP:', error);
    throw error;
  }
}

export async function generateInvoice(callback: string, amountInSats: number, comment?: string) {
  try {
    const amountInMilliSats = amountInSats * 1000; // Convert sats to millisats
    const params = new URLSearchParams({ amount: amountInMilliSats.toString() });
    if (comment) params.append('comment', comment);

    const url = `${callback}?${params.toString()}`;
    const data = await fetch(url).then((res) => res.json());

    if (data && data?.pr) {
      return { pr: data?.pr, verify: data?.verify };
    }

    throw new Error('Invalid invoice response');
  } catch (error) {
    console.error('Error generating invoice:', error);
    throw error;
  }
}

interface GeneratePayment {
  lightningAddress: string;
  amount: number;
}

export async function generatePayment(props: GeneratePayment) {
  const { lightningAddress, amount } = props;

  try {
    // Get LNURLP
    const lnurlp = await getLnurlp(lightningAddress);

    // Generate invoice
    const invoice = await generateInvoice(lnurlp.callback, amount);

    return { invoice, callback: lnurlp.callback };
  } catch (error) {
    console.error('Error during payment process:', error);
  }
}

type PaymentStatusResponse = {
  settled: boolean;
};

interface CronConfig {
  verifyUrl: string; // URL to check payment status
  intervalMs?: number; // Interval in milliseconds between checks
  maxRetries?: number; // Maximum number of try
  onPaymentConfirmed: (isPaid: boolean) => void; // Callback when payment is detected
  onPaymentFailed?: () => void; // Callback if attempts are exhausted
}

export function listenPayment({
  verifyUrl,
  intervalMs = 5000,
  maxRetries = 12,
  onPaymentConfirmed,
  onPaymentFailed,
}: CronConfig) {
  let retries = 0;

  const cron = setInterval(async () => {
    try {
      // Verify state of payment
      const response = await fetch(verifyUrl);
      const data: PaymentStatusResponse = await response.json();

      // Is paid
      if (response.ok && data.settled) {
        clearInterval(cron);
        onPaymentConfirmed(true);

        return;
      }

      retries++;

      // If the maximum number of attempts was reached, we return an error
      if (retries >= maxRetries) {
        console.warn('Max retries reached. Payment not confirmed.');

        clearInterval(cron);
        onPaymentFailed?.();
      }
    } catch (error) {
      console.error('Error during payment status check:', error);
      retries++;

      if (retries >= maxRetries) {
        console.warn('Max retries reached due to errors. Payment not confirmed.');

        clearInterval(cron);
        onPaymentFailed?.();
      }
    }
  }, intervalMs);
}

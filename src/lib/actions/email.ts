export async function sendEmail(email: string, orderId: string) {
    // 1. Generate QR code using free API service
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(orderId)}&size=200x200`;
  
    // 2. Email body 
    const emailBody = `
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td align="center" style="padding: 20px; font-family: Arial, sans-serif;">
            <table border="0" cellspacing="0" cellpadding="0" width="600" style="max-width: 100%;">
                <tr>
                <td align="center" style="padding: 20px;">
                    <h2 style="color: #333333; font-size: 24px; margin: 0 0 20px 0;">¡Tu entrada para el Coworking!</h2>
                    
                    <p style="font-size: 16px; color: #555555; margin: 0 0 20px 0; text-align: center;">
                    Presenta este código único al ingresar:<br>
                    <strong style="font-size: 18px; letter-spacing: 2px; background: #f5f5f5; padding: 8px 15px; border-radius: 4px; display: inline-block; margin: 10px 0;">
                        ${orderId}
                    </strong>
                    </p>
                    
                    <img src="${qrUrl}" alt="Código QR de acceso" 
                        style="display: block; margin: 20px auto; border: 1px solid #dddddd; padding: 10px; max-width: 200px;">
                    
                    <p style="color: #666666; font-size: 14px; margin: 15px 0 0 0; text-align: center;">
                    Escanea el código QR o presenta el código alfanumérico
                    </p>
                </td>
                </tr>
            </table>
            </td>
        </tr>
    </table>`;
  
    // 3. Send email using Plunk API
    try {
      const response = await fetch('https://api.useplunk.com/v1/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PLUNK_API_KEY}`
        },
        body: JSON.stringify({
          to: email,
          subject: 'Tu código de acceso al Coworking',
          body: emailBody,
          options: {
            html: true
          }
        })
      });
  
      return await response.json();
    } catch (error) {
        console.error('Error generating invoice:', error);
        throw error;
    }
}
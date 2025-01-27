export function formatBigNumbers(value: number, decimal?: boolean) {
  let number = Number(value);
  if (decimal) {
    number = Number(value.toFixed(2));
  }

  const format = new Intl.NumberFormat().format(number);

  return format;
}

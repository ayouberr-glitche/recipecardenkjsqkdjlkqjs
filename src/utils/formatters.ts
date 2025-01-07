export const formatTime = (minutes: number): string => {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}min`;
};

export const adjustValue = (value: string, currentServings: number, baseServings: number): string => {
  const baseValue = parseFloat(value) / baseServings;
  return Math.round(baseValue * currentServings).toString();
};

export const formatAmount = (amountStr: string, currentServings: number, baseServings: number): string => {
  if (!amountStr || amountStr.trim() === '') return '';

  // Handle fractions (e.g., "1/2")
  if (amountStr.includes('/')) {
    const [numerator, denominator] = amountStr.split('/').map(num => parseFloat(num.trim()));
    if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
      const decimal = (numerator / denominator) * (currentServings / baseServings);
      if (Number.isInteger(decimal)) {
        return decimal.toString();
      }
      // Return as a fraction
      const factor = currentServings / baseServings;
      const newNumerator = numerator * factor;
      const newDenominator = denominator;
      return `${newNumerator}/${newDenominator}`;
    }
  }

  // For regular numbers
  const amount = parseFloat(amountStr);
  if (!isNaN(amount)) {
    const adjusted = amount * (currentServings / baseServings);
    return Number.isInteger(adjusted) ? adjusted.toString() : adjusted.toFixed(1);
  }

  return amountStr;
};
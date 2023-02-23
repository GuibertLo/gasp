/**
 * Class representing a percentage value.
 */
class Percentage {
  numerator: number;
  denominator: number;

  /**
   * Creates an instance of Percentage.
   * @constructor
   * @param { number } newNumerator - The value to be considered as numerator
   * @param { number } newDenominator - The value to be considered as denominator
   */
  constructor(newNumerator: number, newDenominator: number) {
    this.numerator = newNumerator;
    this.denominator = newDenominator;
  }

  /**
   * Return a valid percentage value.
   * The precision after the comma can be specified.
   * Verifies whether the percentage value is bounded within 0 and 100. If not, a zero is returned.
   * @param { number } [precision=0] - Facultative, the precision after the comma of the percentage value. Default is 0.
   */
  getPercentage(precision: number = 0): number {
    const percentage = (this.numerator / this.denominator) * 100;
    if (percentage <= 100 && percentage >= 0) {
      return parseInt(percentage.toFixed(precision));
    } else return 0;
  }
}

export { Percentage };

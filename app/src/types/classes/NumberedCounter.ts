/**
 * Class representing a structure that counts the total amount of Items contained into a Subcategory and the amount of items being evaluated by the user.
 */
class NumberedCounter {
  amount: number;
  count: number;

  /**
   * Creates an instance of NumberedCounter, with or without an initial count.
   * @constructor
   * @param { boolean } [countOne] - Whether the inital total amount counter must be increased to one
   */
  constructor(countOne: boolean) {
    if (countOne) this.amount = 1;
    else this.amount = 0;
    this.count = 0;
  }

  /**
   * Increases by one unit the Subcategory's counter of items being evaluated by the user.
   */
  increaseCount(): void {
    if (this.count < this.amount) this.count = this.count + 1;
  }
  /**
   * Increases by one unit the Subcategory's counter of the total amount of Items contained into the Subcategory.
   */
  increaseAmount(): void {
    this.amount = this.amount + 1;
  }

  /**
   * Sets the Subcategory's counter of the total amount of contained Items to an arbitrary value.
   * @param { number } newAmount - The new value for the counter of the total amount of Items
   */
  setAmount(newAmount: number): void {
    this.amount = newAmount;
  }

  /**
   * Get the Subcategory's counter of the total amount of contained Items.
   * @returns { number } The corresponding value.
   */
  getAmount(): number {
    return this.amount;
  }
  /**
   * Get the Subcategory's counter of the amount of items being evaluated by the user.
   * @returns { number } The corresponding value.
   */
  getCount(): number {
    return this.count;
  }
}

export { NumberedCounter };

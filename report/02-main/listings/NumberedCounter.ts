class NumberedCounter {
	amount: number;
	count: number;

	constructor(countOne: boolean) {
		if (countOne) this.amount = 1;
		else this.amount = 0
		this.count = 0;
	}

	increaseCount(): void {
		if (this.count < this.amount)
			this.count = this.count + 1;
	}
	increaseAmount(): void {
		this.amount = this.amount+1;
	}

	setAmount(newAmount: number): void {
		this.amount = newAmount;
	}

	getAmount(): number {
		return this.amount;
	}
	getCount(): number {
		return this.count;
	}
}

export { NumberedCounter };
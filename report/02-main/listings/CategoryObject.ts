import type { CategoryData } from "../interfaces/CategoryData";
import type { Subcategory } from "./SubcategoryObject";

class Category implements CategoryData {
	id: number;
	name: string;
	subcategories: Map <number, Subcategory> 

	constructor(categoryData: CategoryData) {
		this.id = categoryData.id;
		this.name = categoryData.name;
		this.subcategories = new Map<number, Subcategory>();
	}
}

export { Category };

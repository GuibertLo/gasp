import type { CategoryData } from "../interfaces/CategoryData";
import type { Subcategory } from "./SubcategoryObject";

/**
 * Class representing a Category.
 * @implements { CategoryData }
 */
class Category implements CategoryData {
  id: number;
  name: string;
  subcategories: Map<number, Subcategory>;

  /**
   * Creates an instance of Category, including a { Map } for related children.
   * @constructor
   * @param { CategoryData } categoryData - Raw data of the Category
   */
  constructor(categoryData: CategoryData) {
    this.id = categoryData.id;
    this.name = categoryData.name;
    this.subcategories = new Map<number, Subcategory>();
  }
}

export { Category };

import type { SubcategoryData } from "../interfaces/SubcategoryData";
import type { Objective } from "./ObjectiveObject";

/**
 * Class representing a Subcategory.
 * @implements { SubcategoryData }
 */
class Subcategory implements SubcategoryData {
  category: number;
  id: number;
  name: string;
  description: string;
  PK: string;
  objectives: Map<number, Objective>;

  /**
   * Creates an instance of Subcategory, including a { Map } for related children.
   * @constructor
   * @param { SubcategoryData } subcategoryData - Raw data of the Subcategory
   */
  constructor(subcategoryData: SubcategoryData) {
    this.category = subcategoryData.category;
    this.id = subcategoryData.id;
    this.name = subcategoryData.name;
    this.description = subcategoryData.description;
    this.PK = subcategoryData.PK;
    this.objectives = new Map<number, Objective>();
  }
}

export { Subcategory };

import type { ObjectiveData } from "../interfaces/ObjectiveData";
import type { Item } from "./ItemObject";

/**
 * Class representing an Objective.
 * @implements { ObjectiveData }
 */
class Objective implements ObjectiveData {
  subcategory: string;
  id: number;
  name: string;
  PK: string;
  items: Map<number, Item>;

  /**
   * Creates an instance of Objective, including a { Map } for related children.
   * @constructor
   * @param { ObjectiveData } obectiveData - Raw data of the Objective
   */
  constructor(obectiveData: ObjectiveData) {
    this.subcategory = obectiveData.subcategory;
    this.id = obectiveData.id;
    this.name = obectiveData.name;
    this.PK = obectiveData.PK;
    this.items = new Map<number, Item>();
  }
}

export { Objective };

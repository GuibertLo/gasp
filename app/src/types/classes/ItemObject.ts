import type { Evaluations } from "../enums/Evaluations";
import type { DescriptionData } from "../interfaces/DescriptionData";
import type { ItemData } from "../interfaces/ItemData";

/**
 * Class representing an Item.
 * @implements { ItemData }
 */
class Item implements ItemData {
  objective: string;
  id: number;
  name: string;
  topic: string;
  probability: number;
  severity: number;
  risk: number;
  requirement: string;
  PK: string;
  remarks?: string;
  evaluation?: undefined | Evaluations;
  descriptions: Map<number, DescriptionData>;

  /**
   * Creates an instance of Item, including a { Map } for related children.
   * @constructor
   * @param { ItemData } itemData - Raw data of the Item
   */
  constructor(itemData: ItemData) {
    this.objective = itemData.objective;
    this.id = itemData.id;
    this.name = itemData.name;
    this.topic = itemData.topic;
    this.probability = itemData.probability;
    this.severity = itemData.severity;
    this.risk = itemData.risk;
    this.requirement = itemData.requirement;
    this.PK = itemData.PK;
    this.remarks = itemData.remarks;
    this.evaluation = itemData.evaluation;
    this.descriptions = new Map<number, DescriptionData>();
  }

  /**
   * Change the Item's evaluation value.
   * @param { Evaluations } newValue - The new value for Item's evaluation status
   */
  changeEvaluation(newValue: Evaluations): void {
    this.evaluation = newValue;
  }
}

export { Item };

/**
 * @typedef ObjectiveData
 * @prop { string } subcategory - The Objective's parent Subcategory primary key
 * @prop { number } id - The Objective's identifier
 * @prop { string } name - The Objective's name
 * @prop { string } PK - The Objective's unique primary key
 */
interface ObjectiveData {
  subcategory: string;
  id: number;
  name: string;
  PK: string;
}

export type { ObjectiveData };

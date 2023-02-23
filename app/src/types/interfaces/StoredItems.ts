import type { Evaluations } from "../enums/Evaluations";

/**
 * @typedef StoredItems
 * @prop { string } PK - The Item's unique primary key
 * @prop { Evaluations } evaluation - The Item's evaluation status
 */
interface StoredItems {
  PK: string;
  evaluation: Evaluations;
}

export type { StoredItems };

import type { GuideData } from "./GuideData";
import type { StoredItems } from "./StoredItems";

/**
 * @typedef StoredResults
 * @prop { String } checkHash - The hash value used for the results
 * @prop { StoredItems[] } items - All the Items evaluated
 * @prop { GuideData } evaluation - A copy of the guide content
 */
interface StoredResults {
  checkHash: String;
  items: StoredItems[];
  evaluation: GuideData;
}

export type { StoredResults };

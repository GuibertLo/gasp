/**
 * @typedef ObjectsCounter
 * @prop { number } categories - The amount of categories
 * @prop { number } subcategories - The amount of subcategories
 * @prop { number } objectives - The amount of objectives
 * @prop { number } items - The amount of items
 * @prop { number } descriptions - The amount of descriptions
 */
interface ObjectsCounter {
  categories: number;
  subcategories: number;
  objectives: number;
  items: number;
  descriptions: number;
}

export type { ObjectsCounter };

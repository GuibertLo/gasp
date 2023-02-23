import type { CategoryData } from "./CategoryData";
import type { DescriptionData } from "./DescriptionData";
import type { ItemData } from "./ItemData";
import type { ObjectiveData } from "./ObjectiveData";
import type { SubcategoryData } from "./SubcategoryData";

/**
 * @typedef GuideData
 * @prop { CategoryData[] } categories - The guide's Categories
 * @prop { SubcategoryData[] } subcategories - The guide's Subategories
 * @prop { ObjectiveData[] } objectives - The guide's Subategories
 * @prop { ItemData[] } items - The guide's Subategories
 * @prop { DescriptionData[] } descriptions - The guide's Subategories
 * @prop { string } hash - The guide's hash value
 */
interface GuideData {
  categories: CategoryData[];
  subcategories: SubcategoryData[];
  objectives: ObjectiveData[];
  items: ItemData[];
  descriptions: DescriptionData[];
  hash: string;
}

export type { GuideData };

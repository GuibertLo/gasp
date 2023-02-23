/**
 * @typedef SubcategoryData
 * @prop { string } category - The Subcategory's parent Category primary key
 * @prop { number } id - The Subcategory's identifier
 * @prop { string } name - The Subcategory's name
 * @prop { string } description - The Subcategory's description
 * @prop { string } PK - The Subcategory's unique primary key
 */
interface SubcategoryData {
  category: number;
  id: number;
  name: string;
  description: string;
  PK: string;
}

export type { SubcategoryData };

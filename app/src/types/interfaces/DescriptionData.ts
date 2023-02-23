/**
 * @typedef DescriptionData
 * @prop { string } item - The Description's parent Item primary key
 * @prop { number } id - The Description's identifier
 * @prop { string } name - The Description's name
 * @prop { string } value - The Description's content
 * @prop { string } [link] - The Description's link to external resource, if any
 * @prop { string } [alt] - The Description's alternative text for link, if any
 * @prop { string } PK - The Description's unique primary key
 */
interface DescriptionData {
  item: string;
  id: number;
  name: string;
  value: string;
  link?: string;
  alt?: string;
  PK: string;
}

export type { DescriptionData };

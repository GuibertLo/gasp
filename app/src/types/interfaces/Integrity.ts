/**
 * @typedef Integrity
 * @prop { boolean } hasItem - Status on whether the corresponding object's identifier has already been defined
 * @prop { Integrity[] } children - A recursive array of { Integrity } objects, to store object's children identifier status
 */
interface Integrity {
  hasItem: boolean;
  children: Integrity[];
}

export type { Integrity };

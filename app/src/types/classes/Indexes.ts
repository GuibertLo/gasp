/**
 * Class representing objects' primary key into the form of identifiers for their related parent objects.
 */
class Indexes {
  category?: number;
  subcategory?: number;
  objective?: number;
  item?: number;
  description?: number;

  /**
   * Creates an instance of Indexes.
   * @constructor
   * @param { string } PK - The value of the object's primary key.
   */
  constructor(PK: string) {
    const indexes = Array.from(PK.split("."), Number);

    // if (indexes.length <= 1) this.category = indexes[0]
    // if (indexes.length <= 2) this.subcategory = indexes[1]
    // if (indexes.length <= 3) this.objective = indexes[2]
    // if (indexes.length <= 4) this.item = indexes[3]
    // if (indexes.length <= 5) this.description = indexes[4]

    // Defining the indexes based on the amount of identifiers into the given primary key
    switch (indexes.length) {
      case 1:
        this.category = indexes[0];
      case 2:
        this.category = indexes[0];
        this.subcategory = indexes[1];
      case 3:
        this.category = indexes[0];
        this.subcategory = indexes[1];
        this.objective = indexes[2];
      case 4:
        this.category = indexes[0];
        this.subcategory = indexes[1];
        this.objective = indexes[2];
        this.item = indexes[3];
      case 5:
        this.category = indexes[0];
        this.subcategory = indexes[1];
        this.objective = indexes[2];
        this.item = indexes[3];
        this.description = indexes[4];
      default:
        // Should not happen
        undefined;
    }
  }

  /**
   * Get a Subcategory's parent identifier and its own identifier.
   * @returns { [number, number] } The values of the parent Category identifier and of the Subcategory identifier. Negative values are rturned for invalid primary keys.
   */
  getSubcategoryIndexes(): [number, number] {
    if (this.category && this.subcategory) {
      return [this.category, this.subcategory];
    } else {
      return [-1, -1];
    }
  }

  /**
   * Get an Objective's parents identifier and its own identifier.
   * @returns { [number, number, number] } The values of the parent Category identifier, of the parent Subcategory identifier and of the Objective identifier. Negative values are rturned for invalid primary keys.
   */
  getObjectiveIndexes() {
    if (this.category && this.subcategory && this.objective) {
      return [this.category, this.subcategory, this.objective];
    } else {
      return [-1, -1, -1];
    }
  }

  /**
   * Get an Item's parents identifier and its own identifier.
   * @returns { [number, number, number, number] } The values of the parent Category identifier, of the parent Subcategory identifier, of the parent Objective identifier, and of the Item identifier. Negative values are rturned for invalid primary keys.
   */
  getItemIndexes() {
    if (this.category && this.subcategory && this.objective && this.item) {
      return [this.category, this.subcategory, this.objective, this.item];
    } else {
      return [-1, -1, -1, -1];
    }
  }

  /**
   * Get an Description's parents identifier and its own identifier.
   * @returns { [number, number, number, number, number] } The values of the parent Category identifier, of the parent Subcategory identifier, of the parent Objective identifier, of the parent Item identifier, and of the Description identifier. Negative values are rturned for invalid primary keys.
   */
  getDescriptionIndexes() {
    if (
      this.category &&
      this.subcategory &&
      this.objective &&
      this.item &&
      this.description
    ) {
      return [
        this.category,
        this.subcategory,
        this.objective,
        this.item,
        this.description,
      ];
    } else {
      return [-1, -1, -1, -1, -1];
    }
  }
}

export { Indexes };

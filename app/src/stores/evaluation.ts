import type { Category } from "@/types/classes/CategoryObject";
import type { Item } from "@/types/classes/ItemObject";
import type { Objective } from "@/types/classes/ObjectiveObject";
import type { Subcategory } from "@/types/classes/SubcategoryObject";
import type { DescriptionData } from "@/types/interfaces/DescriptionData";

import type { ObjectsCounter } from "@/types/interfaces/ObjectsCounter";

import { Evaluations } from "@/types/enums/Evaluations";

import { Percentage } from "@/types/classes/Percentage";
import { NumberedCounter } from "@/types/classes/NumberedCounter";
import { Indexes } from "@/types/classes/Indexes";

import { defineStore } from "pinia";
import type { CategoryData } from "@/types/interfaces/CategoryData";
import type { SubcategoryData } from "@/types/interfaces/SubcategoryData";
import type { ObjectiveData } from "@/types/interfaces/ObjectiveData";
import type { ItemData } from "@/types/interfaces/ItemData";
import type { GuideData } from "@/types/interfaces/GuideData";

// Defintion of the Pinia store for all the guide's content
export const useEvaluationStore = defineStore("evaluation", {
  // Pinia store's properties (state)
  state: () => ({
    /**
     * @type String
     * Used as comparison for assessing wheter restored results.
     * where done using the same guide's content.
     */
    hash: "" as String,

    /**
     * @type {Map<number, Category>}
     * Stores all the guide's content in a hierarchic tree.
     * The key is a number, which represents the unique identifier of the category.
     * The category is stored using the Category class.
     */
    guide: new Map() as Map<number, Category>,

    /**
     * @type {Map<string, NumberedCounter>}
     * Structure that counts the total amount of Items contained into each Subcategory and the amount of items being evaluated by the user.
     * The key is a string, which represents the unique identifier of the subcategory given as a primary key (PK).
     * The category is stored using the NumberedCounter class, which contains the two counters.
     */
    subcategoriesCounter: new Map() as Map<string, NumberedCounter>,

    /**
     * @type {ObjectsCounter | undefined}
     * Structure that counts the total amount of evaluation objects.
     * Each attribute stores the corresponding object's amount of occurrences.
     */
    statistics: undefined as ObjectsCounter | undefined,
  }),

  // Pinia store's getters, to retreive data
  getters: {
    /**
     * Returns the current status of the store, whether the guide's content has been stored.
     * @param state - automatically given by the Pinia store.
     * @returns {boolan} a boolean value
     */
    getStatus: (state): boolean => {
      return state.guide.size !== 0;
    },
    /**
     * Returns the whole values of the guide, as imported.
     * @param state - automatically given by the Pinia store.
     * @returns { GuideData } The whole guide's content including the hash
     */
    getWholeGuide: (state): GuideData => {
      const categories = [] as CategoryData[];
      const subcategories = [] as SubcategoryData[];
      const objectives = [] as ObjectiveData[];
      const items = [] as ItemData[];
      const descriptions = [] as DescriptionData[];
      state.guide.forEach((category) => {
        categories.push(category);
        category.subcategories.forEach((subcategory) => {
          subcategories.push(subcategory);
          subcategory.objectives.forEach((objective) => {
            objectives.push(objective);
            objective.items.forEach((item) => {
              items.push(item);
              item.descriptions.forEach((description) => {
                descriptions.push(description);
              });
            });
          });
        });
      });

      return {
        categories: categories as CategoryData[],
        subcategories: subcategories as SubcategoryData[],
        objectives: objectives as ObjectiveData[],
        items: items as ItemData[],
        descriptions: descriptions as DescriptionData[],
        hash: state.hash as string,
      } as GuideData;
    },

    /**
     * Returns all the guide's Categories with their embedded children.
     * @param state - automatically given by the Pinia store.
     * @returns { Category[] } an array containing all the Categories.
     */
    getAllCategories: (state): Category[] => {
      // Create and populate an array to return objects as the Category class.
      const categories = [] as Category[];
      state.guide.forEach((category) => {
        categories.push(category);
      });

      return categories;
    },
    /**
     * Returns all the guide's Objectives with their embedded children.
     * @param state - automatically given by the Pinia store.
     * @returns { Objective[] } an array containing all the Objectives.
     */
    getAllObjectives: (state): Objective[] => {
      // Create and populate an array to return objects as the Objective class.
      const objectives = [] as Objective[];
      // Parsing all the stored Categories and their Subcategories to reach all the Objectives.
      state.guide.forEach((category) => {
        category.subcategories.forEach((subcategory) => {
          subcategory.objectives?.forEach((objective) => {
            objectives.push(objective);
          });
        });
      });

      return objectives;
    },
    /**
     * Returns all the guide's Items with their embedded children if any.
     * @param state - automatically given by the Pinia store.
     * @returns { Item[] } an array containing all the Items.
     */
    getAllItems: (state): Item[] => {
      // Create and populate an array to return objects as the Items class.
      const items = [] as Item[];
      // Parsing all the stored Categories, their Subcategories, and their Objectives to reach all the items.
      state.guide.forEach((category) => {
        category.subcategories.forEach((subcategory) => {
          subcategory.objectives?.forEach((objective) => {
            objective.items?.forEach((item) => {
              items.push(item);
            });
          });
        });
      });

      return items;
    },
    /**
     * Returns the stored value of the hash.
     * @param state - automatically given by the Pinia store.
     * @returns { String } a String representing the hash.
     */
    getHash: (state): String => state.hash,

    /**
     * Returns all the Subcategories, with their embedded children, related to a single Category.
     * @param state - automatically given by the Pinia store.
     * @param { number } categoryId - The unique identifier of the concerned Category.
     * @returns { Subcategory[] } an array containing all the related Subcategories.
     */
    getSubcategoriesFromCategory:
      (state) =>
      (categoryId: number): Subcategory[] => {
        // Retrieving the Subcategories from the store using built-in { Map } methods
        const x = state.guide.get(categoryId)?.subcategories.values();
        /* Test to avoid error if no Subcategories are found.
			Should not happen thanks to the data verification step) */
        if (x)
          // converting { Map } values to the { Subcategory } class.
          return Array.from(x) as Subcategory[];
        // Avoid error if the Category is empty
        else return [] as Subcategory[];
      },
    /**
     * Returns all the Objectives, with their embedded children, related to a single Subcategory.
     * @param state - automatically given by the Pinia store.
     * @param { string } subcategoryPk - The unique identifier of the concerned Subcategory.
     * @returns { Objective[] } an array containing all the related Objectives.
     */
    getObjectivesFromSubcategory:
      (state) =>
      (subcategoryPk: string): Objective[] => {
        // Using the { Indexes } class to convert the Subcategory primary key to related identifiers of parent objects.
        const [catId, subId] = new Indexes(
          subcategoryPk
        ).getSubcategoryIndexes();
        // Retrieving the Objectives from the store using built-in { Map } methods
        const x = state.guide
          .get(catId)
          ?.subcategories.get(subId)
          ?.objectives.values();
        /* Test to avoid error if no Objectives are found.
			Should not happen thanks to the data verification step) */
        if (x)
          // converting { Map } values to the { Objective } class.
          return Array.from(x) as Objective[];
        // Avoid error if the Subcategory is empty
        else return [] as Objective[];
      },
    /**
     * Returns all the Items, with their embedded children if any, related to a single Objective.
     * @param state - automatically given by the Pinia store.
     * @param { string } objectivePK - The unique identifier of the concerned Objective.
     * @returns { Item[] } an array containing all the related Items.
     */
    getItemsFromObjective:
      (state) =>
      (objectivePK: string): Item[] => {
        // Using the { Indexes } class to convert the Objective primary key to related identifiers of parent objects.
        const [catId, subId, objId] = new Indexes(
          objectivePK
        ).getObjectiveIndexes();
        // Retrieving the Objectives from the store using built-in { Map } methods
        const x = state.guide
          .get(catId)
          ?.subcategories.get(subId)
          ?.objectives.get(objId)
          ?.items.values();
        /* Test to avoid error if no Items are found.
			Should not happen thanks to the data verification step) */
        if (x)
          // converting { Map } values to the { Items } class.
          return Array.from(x) as Item[];
        // Avoid error if the Objective is empty
        else return [] as Item[];
      },
    /**
     * Returns all unchecked Items, with their embedded children if any, related to a single Objective.
     * @param state - automatically given by the Pinia store.
     * @param { string } objectivePK - The unique identifier of the concerned Objective.
     * @returns { Item[] } an array containing all the related Items.
     */
    getUncheckedItemsFromObjective:
      (state) =>
      (objectivePK: string): Item[] => {
        // todo use getItemsFromObjective getter
        // Using the { Indexes } class to convert the Objective primary key to related identifiers of parent objects.
        const [catId, subId, objId] = new Indexes(
          objectivePK
        ).getObjectiveIndexes();
        // Retrieving the Objectives from the store using built-in { Map } methods
        const x = state.guide
          .get(catId)
          ?.subcategories.get(subId)
          ?.objectives.get(objId)
          ?.items.values();
        /* Test to avoid error if no Items are found.
			Should not happen thanks to the data verification step) */
        if (x)
          // only keeping unchecked items in the whole set
          // converting { Map } values to the { Items } class.
          return Array.from(x).filter(
            (record) =>
              record.objective === objectivePK &&
              record.evaluation === Evaluations.unchecked
          ) as Item[];
        // Avoid error if the Objective is empty
        else return [] as Item[];
      },
    /**
     * Returns all the Descriptions related to a single Items.
     * @param state - automatically given by the Pinia store.
     * @param { string } itemPk - The unique identifier of the concerned Item.
     * @returns { DescriptionData[] } an array containing all the related Descriptions.
     */
    getDescriptionsFromItem:
      (state) =>
      (itemPk: string): DescriptionData[] => {
        // Using the { Indexes } class to convert the Item primary key to related identifiers of parent objects.
        const [catId, subId, objId, itemId] = new Indexes(
          itemPk
        ).getItemIndexes();
        // Retrieving the Descriptions from the store using built-in { Map } methods
        const x = state.guide
          .get(catId)
          ?.subcategories.get(subId)
          ?.objectives.get(objId)
          ?.items.get(itemId)
          ?.descriptions.values();
        // Test if one or more Descriptions are found
        if (x)
          // converting { Map } values to the { Description } type.
          return Array.from(x) as DescriptionData[];
        // Avoid error if the Item is empty
        else return [] as DescriptionData[];
      },

    /**
     * Returns the value of the evaluation on an Item.
     * @param state - automatically given by the Pinia store.
     * @param { string } itemPk - The unique identifier of the concerned Item.
     * @returns { Evaluations | undefined } the value of the evaluation, undefined being no evaluation given.
     */
    getItemEvaluation:
      (state) =>
      (itemPK: string): Evaluations | undefined => {
        // Using the { Indexes } class to convert the Item primary key to related identifiers of parent objects.
        const [catId, subId, objId, itemId] = new Indexes(
          itemPK
        ).getItemIndexes();
        // Retrieving the Item from the store using built-in { Map } methods
        return state.guide
          .get(catId)
          ?.subcategories.get(subId)
          ?.objectives.get(objId)
          ?.items.get(itemId)?.evaluation;
      },

    /**
     * Returns a Subcategory, with its embedded children, given its unique identifier.
     * @param state - automatically given by the Pinia store.
     * @param { string } subcategoryPK - The unique identifier of the concerned Item.
     * @returns { Subcategory | undefined } the value of the evaluation, undefined being no evaluation given.
     */
    getSubcategory:
      (state) =>
      (subcategoryPK: string): Subcategory | undefined => {
        // Using the { Indexes } class to convert the Subcategory primary key to related identifiers of parent objects.
        const [catId, subId] = new Indexes(
          subcategoryPK
        ).getSubcategoryIndexes();
        // Retrieving the Subcategory from the store using built-in { Map } methods
        return state.guide.get(catId)?.subcategories.get(subId);
      },

    /**
     * Returns whether a Category has been fully evaluated given its unique identifier.
     * @param state - automatically given by the Pinia store.
     * @param { number } categoryPK - The unique identifier of the concerned Category.
     * @returns { boolean } the evaluation's status of the Category
     */
    isCategoryComplete:
      (state) =>
      (categoryPK: number): boolean => {
        // Parsing the evaluation counter and filtering it
        const subcategories = [...state.subcategoriesCounter].filter(
          ([key]) => {
            // Using the { Indexes } class to convert the Subcategory primary key to related identifiers of parent objects.
            const [catId] = new Indexes(key).getSubcategoryIndexes();
            // Only keeping the Subcategories embedded into the given Category
            return categoryPK == catId;
          }
        );

        // deal with empty categories (should not happen)
        if (!subcategories.length) return true;

        // To avoid error on empty array
        if (subcategories[0]) {
          // Counting the total item amount and the evaluated item amount in all the related Subcategories
          let overallCount: number = 0;
          let overallAmout: number = 0;
          subcategories.forEach((map) => {
            overallCount += map[1].count;
            overallAmout += map[1].amount;
          });
          // Test if all items of the Category have been evaluated
          return overallAmout === overallCount;
        }

        /* Test failed, evaluation not complete 
			Should not happen thanks to the data verification step) */
        return false;
      },
    /**
     * Returns whether a Subcategory has been fully evaluated given its unique identifier.
     * @param state - automatically given by the Pinia store.
     * @param { string } subcategoryPK - The unique identifier of the concerned Subcategory.
     * @returns { boolean } the evaluation's status of the Subcategory
     */
    isSubcategoryComplete:
      (state) =>
      (subcategoryPK: string): boolean => {
        // Retrieving the Subcategory from the store using built-in { Map } methods
        const subcategoriesStatus =
          state.subcategoriesCounter.get(subcategoryPK);
        // To avoid error on empty array
        if (subcategoriesStatus)
          // Test if all items of the Subcategory have been evaluated
          return subcategoriesStatus.count === subcategoriesStatus.amount;
        /* Test failed, evaluation not complete
			Should not happen thanks to the data verification step) */ else return false;
      },
    /**
     * Returns whether the entire evaluation has been fully evaluated.
     * @param - state automatically given by the Pinia store.
     * @returns { boolean } the evaluation's status of the whole guide
     */
    isEvaluationComplete(state): boolean {
      // Counting the total item amount and the evaluated item amount in all the Subcategories
      let overallCount: number = 0;
      let overallAmout: number = 0;
      state.subcategoriesCounter.forEach((map) => {
        overallCount += map.count;
        overallAmout += map.amount;
      });
      // Test if all items have been evaluated
      return overallAmout === overallCount;
    },

    /**
     * Returns the percentage of coverage on a specific Category.
     * @param state - automatically given by the Pinia store.
     * @param { number } categoryId - The unique identifier of the concerned Category.
     * @returns { Percentage } The amount of coverage of the Category.
     */
    getCategoryScore:
      (state) =>
      (categoryId: number): Percentage => {
        const items = [] as Item[];
        // Parsing all related Subcategories to retrieve all the objects
        state.guide.get(categoryId)?.subcategories.forEach((subcategory) => {
          subcategory.objectives?.forEach((objective) => {
            objective.items?.forEach((item) => {
              items.push(item);
            });
          });
        });

        // Use the private method computeScore() to get a score
        return computeScore(items);
      },
    /**
     * Returns the percentage of coverage on the entire evaluation.
     * @param state - automatically given by the Pinia store.
     * @returns { Percentage } The amount of coverage of the evaluation.
     */
    getOverallScore: (state): Percentage => {
      const items = [] as Item[];
      // Parsing all the Categories to retrieve all the objects
      state.guide.forEach((category) => {
        category.subcategories.forEach((subcategory) => {
          subcategory.objectives?.forEach((objective) => {
            objective.items?.forEach((item) => {
              items.push(item);
            });
          });
        });
      });

      // Use the private method computeScore() to get a score
      return computeScore(items);
    },

    /**
     * Returns the total amount of each evaluation object
     * @param state - automatically given by the Pinia store.
     * @returns { ObjectsCounter | undefined } The amount of objects in the store, undefined if none
     */
    getStatistics: (state): ObjectsCounter | undefined => {
      return state.statistics;
    },
  },

  // Pinia store's actions, to act on data
  actions: {
    /**
     * Stores a Category and its children into the store. The Category's unique identifier is used as the { Map } key.
     * Initiates the subcategoriesCounter structure to count the evaluated items.
     * @param { Category } data - the Category type.
     * @return { boolean } A true value is returned on operation success.
     */
    populateCategories(data: Category): boolean {
      // Using the built-in { Map } methods to store the Category to the store.
      this.guide.set(data.id, data);

      // Init item evaluation index
      this.guide.get(data.id)?.subcategories.forEach((subcategory) => {
        subcategory.objectives.forEach((objective) => {
          objective.items.forEach((item) => {
            const oldValue = this.subcategoriesCounter.get(subcategory.PK);
            // Test whether an Item from the Subcategory has already been counted
            if (oldValue) {
              // If so, increase the total counter
              oldValue.increaseAmount();
            }
            // First item to be counter for the Subcategory, initlaization of the Counter
            else
              this.subcategoriesCounter.set(
                subcategory.PK,
                new NumberedCounter(true)
              );
            // this.setCheckbox(Evaluations.checked, undefined, item.PK,)
          });
        });
      });
      // Operation suceeded
      return true;
    },
    /**
     * Stores the hash value into the store.
     * @param { String } data - the hash value
     */
    populateHashes(data: String): void {
      this.hash = data;
    },
    /**
     * Stores the amount of objects into the store.
     * @param { ObjectsCounter } data - the amount of objects value
     */
    populateStatistics(data: ObjectsCounter): void {
      this.statistics = data;
    },

    /**
     * Sets the value of the evaluation of an Item.
     * @param { Evaluations } newStatus - the value to be stored into the store.
     * @param { Evaluations | undefined } oldStatus - the item's old evalaution value.
     * @param { string } itemPK - the unique identifier of the Item.
     */
    setCheckbox(
      newStatus: Evaluations,
      oldStatus: Evaluations | undefined,
      itemPK: string
    ): void {
      // Using the { Indexes } class to convert the Item primary key to related identifiers of parent objects.
      const [catId, subId, objId, itemId] = new Indexes(
        itemPK
      ).getItemIndexes();

      /* Retrieving the stored Item from the store using built-in { Map } methods
			Then change the Item's evaluation value of the store using the changeEvaluation method from { Item } class */
      this.guide
        .get(catId)
        ?.subcategories.get(subId)
        ?.objectives.get(objId)
        ?.items.get(itemId)
        ?.changeEvaluation(newStatus);

      /* Test whether the old evalution value was undefined, which means that it was unevaluated before.
			If so, the Subcategory counter must be updated. */
      if (!oldStatus) {
        // Generating the Item's related Subcategory primary key
        const subcategory = catId.toString() + "." + subId.toString();
        // Get the appropriate Counter
        const oldValue = this.subcategoriesCounter.get(subcategory);
        // Avoid any error
        if (oldValue) {
          // Using the increaseCount method from the { NumberedCounter } to increase the evaluated Item count
          oldValue.increaseCount();
        }
      }
    },
  },
});

/**
 * Compute a score based on a set of Items.
 * @private
 * @param { Item[] } items - The set of Items
 * @returns { Percentage } The computed score
 */
function computeScore(items: Item[]): Percentage {
  /* Computing the numerator part
	Only keeps values from checked or unrelated Items' evaluation 
	Uses Map-Reduce pattern */
  const numerator = items
    .map((item) => {
      switch (item.evaluation) {
        case Evaluations.checked:
        case Evaluations.unrelated:
          return item.risk;
        default:
          return 0;
      }
    })
    .reduce((a, b) => a + b, 0);

  /* Computing the denominator part
	Keeps values from all Items' evaluation
	Uses Map-Reduce pattern */
  const denominator = items
    .map((item) => {
      return item.risk;
    })
    .reduce((a, b) => a + b, 0);

  // Uses the { Percentage } calss to return the score
  return new Percentage(numerator, denominator);
}

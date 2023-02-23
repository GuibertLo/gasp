/**
 * dataHandler module.
 * @module dataHandler
 */

import localData from "@/assets/dataset.json";

import { useEvaluationStore } from "@/stores/evaluation";

import { Category } from "@/types/classes/CategoryObject";
import { Item } from "@/types/classes/ItemObject";
import { Objective } from "@/types/classes/ObjectiveObject";
import { Subcategory } from "@/types/classes/SubcategoryObject";
import type { CategoryData } from "@/types/interfaces/CategoryData";
import type { DescriptionData } from "@/types/interfaces/DescriptionData";
import type { GuideData } from "@/types/interfaces/GuideData";
import type { Integrity } from "@/types/interfaces/Integrity";
import type { ItemData } from "@/types/interfaces/ItemData";
import type { ObjectiveData } from "@/types/interfaces/ObjectiveData";
import type { ObjectsCounter } from "@/types/interfaces/ObjectsCounter";
import type { StoredResults } from "@/types/interfaces/StoredResults";
import type { SubcategoryData } from "@/types/interfaces/SubcategoryData";

/**
 * Load the guide's content in order to check its integrity.
 * Stores the guide's content if integrity checks are passed.
 * @param { GuideData } [customData] - Facultative, the guide's content
 * @returns { Promise<string> } The status of the integrity checks
 */
export function initializeData(customData?: GuideData): Promise<string> {
  // Gets a reference to the Pinia store
  const evaluationStore = useEvaluationStore();

  // Erase all values from the store
  evaluationStore.$reset();

  // Starts the checks
  return new Promise((resolve, reject) => {
    // To store identifiers' uniqueness status
    const verification: Integrity[] = [];

    // To store the guide's content by type
    let categoriesData = [] as CategoryData[];
    let subcategoriesData = [] as SubcategoryData[];
    let objectivesData = [] as ObjectiveData[];
    let itemsData = [] as ItemData[];
    let descriptionsData = [] as DescriptionData[];
    let hashData = "" as String;

    // If argument given, loads the guide's content given by the user
    if (customData) {
      categoriesData = customData.categories as CategoryData[];
      subcategoriesData = customData.subcategories as SubcategoryData[];
      objectivesData = customData.objectives as ObjectiveData[];
      itemsData = customData.items as ItemData[];
      descriptionsData = customData.descriptions as DescriptionData[];
      hashData = customData.hash as String;
    }
    // If no argument given, loads the local guide's content
    else {
      categoriesData = localData.categories as CategoryData[];
      subcategoriesData = localData.subcategories as SubcategoryData[];
      objectivesData = localData.objectives as ObjectiveData[];
      itemsData = localData.items as ItemData[];
      descriptionsData = localData.descriptions as DescriptionData[];
      hashData = localData.hash as String;
    }

    // Variable to count the amount of objects
    const objectsCounter = {
      categories: 0,
      subcategories: 0,
      objectives: 0,
      items: 0,
      descriptions: 0,
    } as ObjectsCounter;

    // All the logic encapsulated into try and catch blocks to use Errors
    try {
      // Error raised if the guide's content is empty
      if (!categoriesData.length) throw "No categories are defined.";

      // Running integrity checks for all Categories
      categoriesData.forEach((category) => {
        // Testing the Category's identifier validity
        if (isIdValid(category.id, categoriesData.length)) {
          throw "Category's ID " + category.id.toString() + " is not valid.";
        }
        // Testing the Category's identifier uniqueness
        if (verification[category.id]) {
          throw "Description " + category.id + " is not unique.";
        }
        // If the Category's identifier is unique, initalizing the corresponding object into the uniqueness checker
        verification[category.id] = {
          hasItem: true,
          children: [] as Integrity[],
        };

        // Creating a { Category } instance based on the checked data
        const newCategory = new Category(category);

        // Incrementing the counter
        objectsCounter.categories++;

        // Parsing the Subcategories related to the Category
        const relatedSubcategories = subcategoriesData.filter(
          (record) => record.category === category.id
        ) as SubcategoryData[];
        // Error raised if no related Subcategories have been found
        if (!relatedSubcategories.length)
          throw "No subcategory is linked to category " + category.id + ".";

        // Running integrity checks for all Subcategories
        relatedSubcategories.forEach((subcategory) => {
          // Testing the Subcategory's identifier validity
          if (isIdValid(subcategory.id, relatedSubcategories.length)) {
            throw "Subcategory's PK " + subcategory.PK + " is not valid.";
          }
          // Testing the Subcategory's identifier uniqueness
          if (verification[category.id].children[subcategory.id]) {
            throw "Subcategory " + subcategory.PK + " is not unique.";
          }
          // If the Subcategory's identifier is unique, initalizing the corresponding object into the uniqueness checker
          verification[category.id].children[subcategory.id] = {
            hasItem: true,
            children: [] as Integrity[],
          };

          // Creating a { Subcategory } instance based on the checked data into its parent Category
          newCategory.subcategories.set(
            subcategory.id,
            new Subcategory(subcategory)
          );

          // Incrementing the counter
          objectsCounter.subcategories++;

          // Parsing the Objectives related to the Subcategory
          const relatedObjectives = objectivesData.filter(
            (record) => record.subcategory === subcategory.PK
          ) as ObjectiveData[];
          // Error raised if no related Objectives have been found
          if (!relatedObjectives.length)
            throw (
              "No objective is linked to subcategory " + subcategory.PK + "."
            );

          // Running integrity checks for all Objectives
          relatedObjectives.forEach((objective) => {
            // Testing the Objective's identifier validity
            if (isIdValid(objective.id, relatedObjectives.length)) {
              throw "Objective's PK " + objective.PK + " is not valid.";
            }
            // Testing the Objective's identifier uniqueness
            if (
              verification[category.id].children[subcategory.id].children[
                objective.id
              ]
            ) {
              throw "Objective " + objective.PK + " is not unique.";
            }
            // If the Objective's identifier is unique, initalizing the corresponding object into the uniqueness checker
            verification[category.id].children[subcategory.id].children[
              objective.id
            ] = {
              hasItem: true,
              children: [] as Integrity[],
            };

            // Creating an { Objective } instance based on the checked data into its parent Subcategory
            newCategory.subcategories
              .get(subcategory.id)
              ?.objectives.set(objective.id, new Objective(objective));

            // Incrementing the counter
            objectsCounter.objectives++;

            // Parsing the Items related to the Objective
            const relatedItems = itemsData.filter(
              (record) => record.objective === objective.PK
            ) as ItemData[];
            // Error raised if no related Items have been found
            if (!relatedItems.length)
              throw "No item is linked to objective " + objective.PK + ".";

            // Running integrity checks for all Items
            relatedItems.forEach((item) => {
              // Testing the Item's identifier validity
              if (isIdValid(item.id, relatedItems.length)) {
                throw "Item's PK " + item.PK + " is not valid.";
              }
              // Testing the Item's identifier uniqueness
              if (
                verification[category.id].children[subcategory.id].children[
                  objective.id
                ].children[item.id]
              ) {
                throw "Item " + item.PK + " is not unique.";
              }
              // If the Item's identifier is unique, initalizing the corresponding object into the uniqueness checker
              verification[category.id].children[subcategory.id].children[
                objective.id
              ].children[item.id] = {
                hasItem: true,
                children: [] as Integrity[],
              };

              // Creating an { Item } instance based on the checked data into its parent Objective
              newCategory.subcategories
                .get(subcategory.id)
                ?.objectives.get(objective.id)
                ?.items.set(item.id, new Item(item));

              // Incrementing the counter
              objectsCounter.items++;

              // Parsing the Descriptions related to the Item, if any
              const relatedDescriptions = descriptionsData.filter(
                (record) => record.item === item.PK
              ) as DescriptionData[];

              // Running integrity checks for all Descriptions
              relatedDescriptions.forEach((description) => {
                // Testing the Description's identifier validity
                if (isIdValid(description.id, relatedDescriptions.length)) {
                  throw "Description's PK " + description.PK + " is not valid.";
                }
                // Testing the Description's identifier uniqueness
                if (
                  verification[category.id].children[subcategory.id].children[
                    objective.id
                  ].children[item.id].children[description.id]
                ) {
                  throw "Description " + description.PK + " is not unique.";
                }
                // If the Description's identifier is unique, initalizing the corresponding object into the uniqueness checker
                verification[category.id].children[subcategory.id].children[
                  objective.id
                ].children[item.id].children[description.id] = {
                  hasItem: true,
                  children: [] as Integrity[],
                };

                // Avoid no related Descriptions errors, can happen
                if (relatedDescriptions.length)
                  // Creating an { Description } instance based on the checked data into its parent Item
                  newCategory.subcategories
                    .get(subcategory.id)
                    ?.objectives.get(objective.id)
                    ?.items.get(item.id)
                    ?.descriptions.set(description.id, description);

                // Incrementing the counter
                objectsCounter.descriptions++;
              });
            });
          });
        });

        // Store the Category into the Pinia store
        evaluationStore.populateCategories(newCategory);

        evaluationStore.populateStatistics(objectsCounter);
      });
    } catch (error) {
      /* If any error occurs, an integrity check failed
		Error is logged into the console and is sent inside the rejected Promise*/
      console.log(error);
      return reject(error);
    }

    // If all Categories have been checked, store the hash into the Pinia store
    evaluationStore.populateHashes(hashData);

    // If all Categories have been checked, the Promise is resolved
    return resolve("Store initialized.");
  });
}

/**
 * Checks the results from an old evaluation and stores into the Pinia store
 * @param { string } oldResults - The old results in a JSON format
 * @returns { Promise<boolean | string> } The status of restoration process. The resolved Promises returns whether the guide's content has been changed.
 */
export function restoreResultsFromFile(
  oldResults: string
): Promise<boolean | string> {
  // Gets a reference to the Pinia store
  const evaluationStore = useEvaluationStore();

  // To define if the guide's content is either custom or outdated
  let sameGuide = true;

  // Starts the checks
  return new Promise((resolve, reject) => {
    // The guide's content must be loaded into the store
    if (!evaluationStore.getStatus)
      return reject("The stored evaluation items are invalid.");

    /* Getting the JSON string converted into a StoredResults type
		The StoredResults type checks the attributes */
    const oldResultsJson = JSON.parse(oldResults) as StoredResults;

    // Error raised if the given string is not a valid JSON file
    if (!oldResultsJson) return reject("Your file is not a JSON file");

    // Error raised if the results have missing attributes
    if (
      !oldResultsJson.checkHash ||
      !oldResultsJson.items ||
      !oldResultsJson.items[0].PK
    )
      return reject("Inadapted JSON structure");

    const storedHashes = evaluationStore.getHash;
    // Error raised if the hash from the old results is not the same as the actual guide's content
    if (storedHashes !== oldResultsJson.checkHash) {
      // Setting that the guide's content will be changed
      sameGuide = false;
      // The current guide content is not the same. Falling back to the saved content of the JSON file.
      initializeData(oldResultsJson.evaluation)
        .then()
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    }

    // Change the evaluation value of all the old results' Items
    try {
      oldResultsJson.items.forEach((newItem) => {
        if (newItem.evaluation !== undefined)
          evaluationStore.setCheckbox(
            newItem.evaluation,
            undefined,
            newItem.PK
          );
      });
      /* If any error occurs, an Item do not exists
		Error is logged into the console and is sent inside the rejected Promise*/
    } catch (error) {
      console.log(error);
      reject(error);
    }

    // If all Items' evaluation have been modified, the Promise is resolved with the status of the guide's content
    resolve(sameGuide);
  });
}

/**
 * Integrity check to determine whether an object's identifier is valid.
 * @private
 * @param { number } id - The object's identifier
 * @param { number } boundary - The total amount of objects
 * @returns { boolean } - The index validity
 */
function isIdValid(id: number, boundary: number): boolean {
  // Must be positive, must be contained withing the amount of object and a valid number (integer)
  return id <= 0 || id > boundary || isNaN(id);
}

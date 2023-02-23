import localData from '@/assets/output.json';

import { useEvaluationStore } from '@/stores/evaluation';
import { Category } from '@/types/classes/CategoryObject';
import { Item } from '@/types/classes/ItemObject';
import { Objective } from '@/types/classes/ObjectiveObject';
import { Subcategory } from '@/types/classes/SubcategoryObject';
import type { CategoryData } from '@/types/interfaces/CategoryData';
import type { DescriptionData } from '@/types/interfaces/DescriptionData';
import type { Integrity } from '@/types/interfaces/Integrity';
import type { ItemData } from '@/types/interfaces/ItemData';
import type { ObjectiveData } from '@/types/interfaces/ObjectiveData';
import type { StoredItems } from '@/types/interfaces/StoredItems';
import type { StoredResults } from '@/types/interfaces/StoredResults';
import type { SubcategoryData } from '@/types/interfaces/SubcategoryData';



export function initializeData(customData?: string) {

	const evaluationStore = useEvaluationStore();

	evaluationStore.$reset()

	return new Promise((resolve, reject) => {

		let verification: Integrity[] = []

		let categoriesData = [] as CategoryData[]
		let subcategoriesData = [] as SubcategoryData[]
		let objectivesData = [] as ObjectiveData[]
		let itemsData = [] as ItemData[]
		let descriptionsData = [] as DescriptionData[]
		let hashData = "" as String

		if (customData) {
			let content = JSON.parse(customData)
			categoriesData = content.categories as CategoryData[]
			subcategoriesData = content.subcategories as SubcategoryData[]
			objectivesData = content.objectives as ObjectiveData[]
			itemsData = content.items as ItemData[]
			descriptionsData = content.descriptions as DescriptionData[]
			hashData = content.hash as String
		} else {
			categoriesData = localData.categories as CategoryData[]
			subcategoriesData = localData.subcategories as SubcategoryData[]
			objectivesData = localData.objectives as ObjectiveData[]
			itemsData = localData.items as ItemData[]
			descriptionsData = localData.descriptions as DescriptionData[]
			hashData = localData.hash as String
		}

		try {
			if (!categoriesData.length) throw ("No categories are defined.")

			categoriesData.forEach((category) => {

				if (isIdValid(category.id, categoriesData.length)) {
					throw ("Category's ID " + category.id.toString() + " is not valid.")
				}
				if (verification[category.id]) {
					throw ("Description " + category.id + " is not unique.")
				}
				verification[category.id] = {
					"hasItem": true,
					"children": [] as Integrity[]
				}

				let newCategory = new Category(category)

				objectsCounter.categories++

				let relatedSubcategories = subcategoriesData.filter(record => record.category === category.id) as SubcategoryData[]
				if (!relatedSubcategories.length) throw ("No subcategory is linked to category " + category.id + ".")

				relatedSubcategories.forEach((subcategory)  => {

					if (isIdValid(subcategory.id, relatedSubcategories.length)) {
						throw ("Subcategory's PK " + subcategory.PK + " is not valid.")
					}
					if (verification[category.id]
						.children[subcategory.id]) {
						throw ("Subcategory " + subcategory.PK + " is not unique.")
					}
					verification[category.id]
						.children[subcategory.id] = {
						"hasItem": true,
						"children": [] as Integrity[]
					}

					newCategory.subcategories.set(subcategory.id, new Subcategory(subcategory))

					let relatedObjectives = objectivesData.filter(record => record.subcategory === subcategory.PK) as ObjectiveData[]
					if (!relatedObjectives.length) throw ("No objective is linked to subcategory " + subcategory.PK + ".")

					relatedObjectives.forEach((objective) => {

						if (isIdValid(objective.id, relatedObjectives.length)) {
							throw ("Objective's PK " + objective.PK + " is not valid.")
						}
						if (verification[category.id]
							.children[subcategory.id]
							.children[objective.id]) {
							throw ("Objective " + objective.PK + " is not unique.")
						}
						verification[category.id]
							.children[subcategory.id]
							.children[objective.id] = {
							"hasItem": true,
							"children": [] as Integrity[]
						}

						newCategory.subcategories.get(subcategory.id)?.objectives.set(objective.id, new Objective(objective))

						// category.subcategories.get(subcategory.id)?.objectives?.set(objective.id, objective)

						let relatedItems = itemsData.filter(record => record.objective === objective.PK) as ItemData[]
						if (!relatedItems.length) throw ("No item is linked to objective " + objective.PK + ".")

						relatedItems.forEach((item) => {

							if (isIdValid(item.id, relatedItems.length)) {
								throw ("Item's PK " + item.PK + " is not valid.")
							}
							if (verification[category.id]
								.children[subcategory.id]
								.children[objective.id]
								.children[item.id]) {
								throw ("Item " + item.PK + " is not unique.")
							}
							verification[category.id]
								.children[subcategory.id]
								.children[objective.id]
								.children[item.id] = {
								"hasItem": true,
								"children": [] as Integrity[]
							}
							
							newCategory.subcategories.get(subcategory.id)?.objectives.get(objective.id)?.items.set(item.id, new Item(item))

							// category.subcategories?.get(subcategory.id)?.objectives?.get(objective.id)?.items?.set(item.id, item)

							let relatedDescriptions = descriptionsData.filter(record => record.item === item.PK) as DescriptionData[]

							relatedDescriptions.forEach((description) => {

								if (isIdValid(description.id, relatedDescriptions.length)) {
									throw ("Description's PK " + description.PK + " is not valid.")
								}
								if (verification[category.id]
									.children[subcategory.id]
									.children[objective.id]
									.children[item.id]
									.children[description.id]) {
									throw ("Description " + description.PK + " is not unique.")
								}
								verification[category.id]
									.children[subcategory.id]
									.children[objective.id]
									.children[item.id]
									.children[description.id] = {
									"hasItem": true,
									"children": [] as Integrity[]
								}

								if (relatedDescriptions.length)
									newCategory.subcategories.get(subcategory.id)?.objectives.get(objective.id)?.items.get(item.id)?.descriptions.set(description.id, description)

							})
						})
					})
				})

				evaluationStore.populateCategories(newCategory)
			})
		}
		catch (error) {
			console.log(error)
			return reject(error)
		}

		evaluationStore.populateHashes(hashData);

		return resolve("Store initialized.");
	})
}

export function restoreResultsFromFile(oldResults: string) {

	const evaluationStore = useEvaluationStore();
	
	return new Promise((resolve, reject) => {
		if (!evaluationStore.getStatus) return reject("The stored evaluation items are invalid.")

		const oldResultsJson = JSON.parse(oldResults) as StoredResults
		if (!oldResultsJson)
			return reject("Your file is not a JSON file")
		if (!oldResultsJson.checkHash || !oldResultsJson.items || !oldResultsJson.items[0].PK)
			return reject("Inadapted JSON structure")
		
		let storedHashes = evaluationStore.getHash
		if (storedHashes !== oldResultsJson.checkHash)
			reject("Verification of hashes failed. Your results have been generated with another guide content.")

		try {
			oldResultsJson.items.forEach((newItem) => {
				if (newItem.evaluation !== undefined) evaluationStore.setCheckbox(newItem.evaluation, undefined, newItem.PK)
			})
		} catch (error) {
			console.log(error)
			reject(error)
		}

		resolve(true)
	})
}

function isIdValid(id: number, boundary: number): boolean {
	return id <= 0 || id > boundary || isNaN(id)
}
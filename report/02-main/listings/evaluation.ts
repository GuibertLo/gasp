import type { StoredResults } from "@/types/interfaces/StoredResults";
import type { StoredItems } from "@/types/interfaces/StoredItems";
import type { Category } from "@/types/classes/CategoryObject";
import type { Item } from "@/types/classes/ItemObject";
import type { Objective } from "@/types/classes/ObjectiveObject";
import type { Subcategory } from "@/types/classes/SubcategoryObject";
import type { DescriptionData } from "@/types/interfaces/DescriptionData";

import { Evaluation } from "@/types/enums/Evaluation";
import { Percentage } from "@/types/classes/Percentage";
import { NumberedCounter } from "@/types/classes/NumberedCounter";
import { Indexes } from "@/types/classes/Indexes";

import { defineStore } from "pinia";



export const useEvaluationStore = defineStore("evaluation", {

	state: () => ({ 
		hash: "" as String,

		guide: new Map as Map<number, Category>,

		subcategoriesCounter: new Map as Map<string, NumberedCounter>,

		statistics: undefined as ObjectsCounter | undefined
	}),

	getters: {
		getStatus: (state) => {
			return state.guide.size !== 0
		},

		getAllCategories: (state): Category[] => {
			let categories = [] as Category[]
			state.guide.forEach((category) => {
				categories.push(category)
			})

			return (categories)
		},
		getAllObjectives: (state): Objective[] => {
			let objectives = [] as Objective[]
			state.guide.forEach((category) => {
				category.subcategories.forEach((subcategory) => {
					subcategory.objectives?.forEach((objective) => {
						objectives.push(objective)
					})
				})
			})

			return (objectives)
		},
		getAllItems: (state): Item[] => {
			let items = [] as Item[]
			state.guide.forEach((category) => {
				category.subcategories.forEach((subcategory) => {
					subcategory.objectives?.forEach((objective) => {
						objective.items?.forEach((item) => {
							items.push(item)
						})
					})
				})
			})

			console.log(items)
			return (items)
		},
		getHash: (state): String => state.hash,

		getSubcategoriesFromCategory: (state) => (categoryId: number): Subcategory[] => {
			let x = state.guide.get(categoryId)?.subcategories.values()
			if (x)
				return Array.from(x) as Subcategory[]
			else return [] as Subcategory[]
		},
		getObjectivesFromSubcategory: (state) => (subcategoryPk: string): Objective[] => {
			let [catId, subId] = new Indexes(subcategoryPk).getSubcategoryIndexes()
			let x = state.guide
			.get(catId)?.subcategories
			.get(subId)?.objectives.values()
			if (x)
				return Array.from(x) as Objective[]
			else return [] as Objective[]
		},
		getItemsFromObjective: (state) => (objectivePK: string): Item[]  => {
			let [catId, subId, objId] = new Indexes(objectivePK).getObjectiveIndexes()
			let x = state.guide
			.get(catId)?.subcategories
			.get(subId)?.objectives
			.get(objId)?.items.values()
			if (x)
				return Array.from(x) as Item[]
			else return [] as Item[]
		},
		// todo use other getter
		getUncheckedItemsFromObjective: (state) => (objectivePK: string): Item[] => {
			let [catId, subId, objId] = new Indexes(objectivePK).getObjectiveIndexes()
			let x = state.guide.get(catId)?.subcategories
			.get(subId)?.objectives
			.get(objId)?.items.values()
			if (x)
				return Array.from(x).filter(record =>
					record.objective === objectivePK
					&& record.evaluation === Evaluation.unchecked) as Item[]
			else return [] as Item[]
		},
		
		getDescriptionsFromItem: (state) => (itemPk: string): DescriptionData[] => {
			let [catId, subId, objId, itemId] = new Indexes(itemPk).getItemIndexes()
			let x = state.guide.get(catId)?.subcategories
			.get(subId)?.objectives
			.get(objId)?.items
			.get(itemId)?.descriptions.values()
			if (x)
				return Array.from(x) as DescriptionData[]
			else return [] as DescriptionData[]
		},

		getItemEvaluation: (state) => (itemPK: string): Evaluation | undefined => {
			let [catId, subId, objId, itemId] = new Indexes(itemPK).getItemIndexes()
			return state.guide.get(catId)?.subcategories
			.get(subId)?.objectives
			.get(objId)?.items
			.get(itemId)?.evaluation;
		},

		isCategoryComplete: (state) => (categoryPK: number): boolean  => {

			let subcategories = [...state.subcategoriesCounter].filter( ([key] ) => {
				let [catId] = new Indexes(key).getSubcategoryIndexes()
				return categoryPK == catId
			})

			// deal with empty categories (should not happen)
			if (!subcategories.length) return true

			if (subcategories[0]) {
				let overallCount: number = 0;
				let overallAmout: number = 0;
				subcategories.forEach(map => {
					overallCount += map[1].count
					overallAmout += map[1].amount
				});
				return overallAmout === overallCount
			}

			return false
		},
		isSubcategoryComplete: (state) => (subcategoryPK: string): boolean => {
			let subcategoriesStatus = state.subcategoriesCounter.get(subcategoryPK)
			if (subcategoriesStatus)
				return subcategoriesStatus.count === subcategoriesStatus.amount
			else return false
		},
		isEvaluationComplete(state): boolean {
			let overallCount: number = 0;
			let overallAmout: number = 0;
			state.subcategoriesCounter.forEach(map => {
				overallCount += map.count
				overallAmout += map.amount
			});
			return overallAmout === overallCount
		},

		getCategoryScore: (state) => (categoryId: number): Percentage => {

			let items = [] as Item[]
			state.guide.get(categoryId)?.subcategories
			.forEach((subcategory) => {
				subcategory.objectives?.forEach((objective) => {
					objective.items?.forEach( (item) => {
						items.push(item)
					})
				})
			})

			return computeScore(items)
		},
		
		getOverallScore: (state): Percentage => {
			let items = [] as Item[]
			state.guide.forEach ( (category) => {
				category.subcategories.forEach((subcategory) => {
					subcategory.objectives?.forEach((objective) => {
						objective.items?.forEach((item) => {
							items.push(item)
						})
					})
				})
			})
			return computeScore(items)
		},
	},

	actions: {
		populateCategories(data: Category) {
			this.guide.set(data.id, data)

			// Init item evaluation index
			this.guide.get(data.id)?.subcategories
			.forEach((subcategory) => {
				subcategory.objectives.forEach((objective) => {
					objective.items.forEach( () => {
						let oldValue = this.subcategoriesCounter.get(subcategory.PK)
						if (oldValue) {
							oldValue.increaseAmount();
						}
						else
							this.subcategoriesCounter.set(subcategory.PK, new NumberedCounter(true))
							});
						})
			})
			return true
		},
		populateHashes(data: String) {
			this.hash = data;
		},

		setCheckbox(
		newStatus: Evaluation,
		oldStatus: (Evaluation | undefined),
		itemPK: string) {
			let [catId, subId, objId, itemId] = new Indexes(itemPK).getItemIndexes()

			this.guide.get(catId)?.subcategories
			.get(subId)?.objectives
			.get(objId)?.items
			.get(itemId)?.changeEvaluation(newStatus)
			if (!oldStatus) {
				let [catId, subId] = new Indexes(itemPK).getItemIndexes() 
				let subcategory = catId.toString() + "." + subId.toString();
				let oldValue = this.subcategoriesCounter.get(subcategory)
				if (oldValue) {
				oldValue.increaseCount()
				}
			}
		},
	}
});

function computeScore(items: Item[]): Percentage {
	let numerator = items.map((item) => {
		switch (item.evaluation) {
		case Evaluation.checked:
		case Evaluation.unrelated:
			return item.risk
		default:
			return 0
		}
	})
	.reduce((a, b) => a + b, 0);

	let denominator = items.map((item) => {
		return item.risk
	})
	.reduce((a, b) => a + b, 0);

	return new Percentage(numerator, denominator)
}
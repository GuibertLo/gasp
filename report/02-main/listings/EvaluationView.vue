<template>
	<el-container v-if="getStatus">
		<Sidebar/>
		<el-main>
			<Content>
				<h1> {{ active }} - {{ getSubcategory(active)?.name }}</h1>

				<p> {{ getSubcategory(active)?.description }}</p>

				<Objective
				v-for="objective in getObjectivesFromSubcategory($route.params.subcategory as string)"
				:objectiveName="objective.name"
				:objectivePK="objective.PK"/>

			</Content>
		</el-main>
	</el-container>
	<el-container v-else>
		<el-main>
		<Content>
			<p>An error occured. Please contact the administrator.</p>
		</Content>
		</el-main>
	</el-container>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import { useEvaluationStore } from '@/stores/evaluation';
import { storeToRefs } from 'pinia';

import Sidebar from '@/components/Sidebar.vue';
import Content from '@/components/Content.vue';
import Card from '@/components/Card.vue';
import Objective from '@/components/Objective.vue';

export default defineComponent({

	name: "EvaluationView",

	components: {
		Sidebar,
		Content,
		Card,
		Objective,
	},

	data() {
		return {
			active: "1.1"
		}
	},

	setup() {

		const evaluationStore = useEvaluationStore();

		const { getObjectivesFromSubcategory, getStatus, getSubcategory } = storeToRefs(evaluationStore)

		return {
			getObjectivesFromSubcategory,
			getStatus,
			getSubcategory
		};

	},

	computed: {
		currentSubcategory() { this.$route.params.id },
	},

	created() {
		// todo uncomment
		// ElMessageBox.alert("The data are not saved during the evaluation: please do not refresh the page. Your results will be downloadable on the Result page.", "Information")
	}
})

</script>


<style scoped>
.el-aside {
	height: 100%;
}
</style>
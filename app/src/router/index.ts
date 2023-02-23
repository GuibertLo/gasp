import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import EvaluationView from "../views/EvaluationView.vue";
import ResultsView from "@/views/ResultsView.vue";
import ExplanationView from "@/views/ExplanationView.vue";
import RestoreView from "@/views/RestoreView.vue";

import { useEvaluationStore } from "@/stores/evaluation";

// Router definition, including routes
const router = createRouter({
  history: createWebHistory(),
  routes: [
    // The homepage, uses the HomeView component
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    // The explanation page, uses the ExplanationView component
    {
      path: "/explanation/",
      name: "Explanation",
      component: ExplanationView,
    },
    // The restore page, uses the RestoreView component
    {
      path: "/restore/",
      name: "Restore",
      component: RestoreView,
    },
    /* The evaluation root link, redirects to the first Subcategory
		The first Subcategory is never empty, thanks to the data verification check */
    {
      path: "/evaluation/",
      name: "Evaluation Landpage",
      redirect: { path: "/evaluation/1.1" },
    },
    /* The evaluation page, uses the EvaluationView component
		Gives the routerActiveSubcategory prop to the component */
    {
      path: "/evaluation/:routerActiveSubcategory",
      name: "Evaluation",
      props: true,
      component: EvaluationView,
    },
    /* The results page, uses the ResultsView component
		Only allows the route if the evaluation is finished using the beforeEnter guard */
    {
      path: "/results",
      name: "Results",
      component: ResultsView,
      beforeEnter: (_to, _from, next) => {
        const evaluationStore = useEvaluationStore();
        if (!evaluationStore.isEvaluationComplete) return next("/evaluation");
        else next();
      },
    },
  ],
});

export default router;

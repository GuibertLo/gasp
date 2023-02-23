<template>
  <el-main>
    <Content>
      <h1>Results</h1>

      <Spacer>
        <Card class="result-card" title="Overall Score">
          <p>
            You obtained an overall coverage of
            <b data-test="overallScore">
              {{ getOverallScore.getPercentage(2) }}%</b
            >.
          </p>
          <el-progress
            :text-inside="true"
            :show-text="false"
            :stroke-width="45"
            :percentage="getOverallScore.getPercentage(2)"
            :color="getProgressColor(getOverallScore.getPercentage(0))"
          />
        </Card>
      </Spacer>

      <Spacer>
        <Card class="result-card" title="Category Scores">
          <spacer>
            <div class="category-container">
              <el-progress
                v-for="category in getAllCategories"
                :key="category.id"
                type="circle"
                :stroke-width="30"
                :width="257"
                class="subcategory-results"
                :percentage="getCategoryScore(category.id).getPercentage(2)"
                :color="
                  getProgressColor(
                    getCategoryScore(category.id).getPercentage(0)
                  )
                "
              >
                <template #default="{ percentage }">
                  <span
                    class="percentage-value"
                    :style="
                      'color: ' +
                      getProgressColor(
                        getCategoryScore(category.id).getPercentage(0)
                      )
                    "
                    >{{ percentage }}%</span
                  >
                  <span class="percentage-label"> {{ category.name }}</span>
                </template>
              </el-progress>
            </div>
          </spacer>
          <div align="center" v-if="getOverallScore.getPercentage() < 100">
            <a href="#unchecked">
              <el-button> See non-compliant items </el-button>
            </a>
          </div>
        </Card>
      </Spacer>

      <Spacer>
        <Card title="Save your results">
          <p>
            This application does not keep any data in memory. You can save your
            results by downloading a JSON file that can be used for later
            restoration on this same application.
          </p>

          <div align="center">
            <Downloader
              fileName="GASP_results"
              buttonText="Download results"
              buttonType="primary"
            />
          </div>
        </Card>
      </Spacer>

      <Spacer>
        <Card
          id="unchecked"
          title="Non-compliant items"
          v-if="getOverallScore.getPercentage() < 100"
          data-test="uncheckedSection"
        >
          <p>
            You can find here all the items you are not compliant with, sorted
            by their objectives.
          </p>
          <el-divider />
          <div v-for="objective in getAllObjectives" :key="objective.PK">
            <div v-if="getUncheckedItemsFromObjective(objective.PK).length > 0">
              <h3>{{ objective.name }}</h3>
              <div
                v-for="item in getUncheckedItemsFromObjective(objective.PK)"
                :key="item.PK"
              >
                <p data-test="uncheckedItem">
                  <span :class="'circle ' + item.requirement"></span>
                  {{ item.name }}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </Spacer>

      <div align="center">
        <router-link
          class="router-link"
          to="/evaluation"
          data-test="navToEvaluation"
        >
          <el-button type="primary"> Back to the evaluation </el-button>
        </router-link>
      </div>
    </Content>
  </el-main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Content from "@/components/Content.vue";
import Card from "@/components/Card.vue";
import Spacer from "@/components/Spacer.vue";
import Downloader from "@/components/Downloader.vue";

import { useEvaluationStore } from "@/stores/evaluation";
import { storeToRefs } from "pinia";
import { ElMain, ElProgress, ElButton, ElDivider } from "element-plus";

export default defineComponent({
  setup() {
    // Creating a reference to the Pinia store
    const evaluationStore = useEvaluationStore();

    // Creating references to store's getters and actions
    const {
      getUncheckedItemsFromObjective,
      getCategoryScore,
      getAllCategories,
      getOverallScore,
      getAllObjectives,
    } = storeToRefs(evaluationStore);

    // Making store's references available within the component
    return {
      getCategoryScore,
      getOverallScore,
      getAllCategories,
      getUncheckedItemsFromObjective,
      getAllObjectives,
    };
  },

  name: "ResultView",

  components: {
    Card,
    Content,
    Spacer,
    Downloader,
    ElMain,
    ElProgress,
    ElButton,
    ElDivider,
  },

  methods: {
    /**
     * Returns the value for the "color" attribute of the El-progress component from Element Plus.
     * @param { number } percentage - The value of the percentage
     * @returns { string | undefined } - Value of the color to be used, defined by the El-progress component of Element Plus. Can be undefined if the parameter is not appropriate.
     */
    getProgressColor(percentage: number): string | undefined {
      if (percentage) {
        if (percentage < 50) return "var(--el-color-danger)";
        else if (percentage < 85) return "var(--el-color-warning)";
        else if (percentage < 100) return "var(--el-color-success)";
        else return "rgb(57, 139, 16)";
      }
    },
  },
});
</script>

<style scoped>
.category-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  row-gap: 30px;
  column-gap: 50px;
}

.percentage-value {
  display: block;
  margin-top: 10px;
  font-size: 34px;
}

a {
  text-decoration: none;
  color: inherit;
}

.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 20px;
  color: rgb(83, 83, 83);
}

.circle {
  display: inline-block;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  margin-right: 5px;
  border-width: 1px;
  border-style: solid;
}
.circle.m {
  background-color: rgb(255, 0, 0);
  border-color: rgb(132, 0, 0);
}
.circle.s {
  border-color: rgb(197, 197, 0);
  background-color: rgb(255, 255, 25);
}
.circle.c {
  border-color: green;
  background-color: rgb(13, 255, 0);
}
</style>

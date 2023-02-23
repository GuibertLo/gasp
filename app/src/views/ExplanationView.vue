<template>
  <el-main>
    <Content>
      <Spacer>
        <div>
          <h1>GASP explained</h1>

          <p>
            Before accessing to the guide, the evaluation process of
            <b>GASP</b> will be explained.
          </p>
        </div>

        <el-collapse class="restore-collapse">
          <el-collapse-item
            title="Do you want to change the guide content?"
            name="1"
          >
            <p>
              The content of the guide can be changed easily. Our guide
              structure is generic, which means that the guide content can be
              changed to cover more aspects or a different kind of system. To
              this end, a JSON file must be generated using the tools
              <a
                href="https://github.com/GuibertLo/gasp"
                alt="Link to the repository"
                target="_blank"
                >on our repository</a
              >. The file can then be uploaded here.
            </p>
            <Uploader
              accept=".json, .JSON"
              fileType="application/json"
              :callback="changeGuide"
              tooltip="Single json file with a size smaller than 16MB."
            />
          </el-collapse-item>
        </el-collapse>
      </Spacer>

      <Spacer>
        <Card title="Guide structure and content">
          <p>
            The guide is organized by a <b>set of categories</b> that covers all
            the different aspects of the evaluation. Each category is divided
            into one or multiple <b>subcategories</b> that define a specific
            subject to be evaluated. A description is given for each subcategory
            at the top of the evaluation page. The categories and subcategories
            are browsable using the <b>sidebar</b>.
          </p>
          <p>
            Once a subcategory selected, its corresponding <b>objectives</b> are
            shown on the page. A system must meet all of them in order to be
            considered as secure and respectful of its users' privacy. In order
            to evaluate whether the system meets an objective, a
            <b>set of items</b> must be evaluated. If the system is compliant to
            each of them, the system meets the corresponding objective.
          </p>
        </Card>
      </Spacer>

      <Spacer>
        <Card title="Evaluation process">
          <p>
            Each objective contains at least one item that must be evaluated.
          </p>

          <p>
            The <b>color</b> of an item gives is requirement level, based on the
            risks that its non-compliance brings. This classification allows to
            prioritize the biggest threats.
          </p>

          <Columns
            :headers="['Must have', 'Should have', 'Could have']"
            :content="['Red', 'Yellow', 'Green']"
          />

          <p>
            Some items can have <b>descriptions</b>. They give additional
            information, resources or advices on their corresponding item. They
            can be displayed by clicking on the item.
          </p>

          <p>
            Item are evaluated by clicking on their <b>checkbox</b>. The
            checkboxs value cycles through three different states. If an item is
            about a subject that does not concern the system, the
            <b>not concerned</b> evaluation allows to dismiss the item.
          </p>

          <Columns
            :headers="['Compliant', 'Non-compliant', 'Not concerned']"
            :content="['Select', 'CloseBold', 'SemiSelect']"
            :iconMode="true"
          />
        </Card>
      </Spacer>

      <Spacer>
        <Card title="Example">
          <Tip
            backgroundColour="#F5F5F5"
            borderColour="lightgrey"
            title="Demonstation mode"
            >The checkboxes are not linked to the items: clicking on them do not
            change their evaluation value.</Tip
          >

          <Objective :demoMode="true" objectivePK="3.5.1" />
        </Card>
      </Spacer>

      <Spacer>
        <Card title="Results">
          <p>
            Once all the items evaluated, the <b>results</b> page can be
            consulted. It shows the coverage of the system on multiple scopes.
            First, an <b>overall score</b> shows the proportion of all the items
            the system is compliant with across all categories. Then,
            <b>category scores</b> are given to express the system compliance
            with each category.
          </p>

          <p>
            The overall score gives an overview of the general system levels on
            its security and privacy, and the category scores give more details
            about its weakest points.
          </p>

          <p>
            The items with <b>higher risks</b> have a bigger impact on the score
            than the lower risky ones.
          </p>
        </Card>
      </Spacer>

      <Spacer>
        <Card title="Amount of objects in the guide">
          <Columns
            :headers="[
              'Categories',
              'Subcategories',
              'Objectives',
              'Items',
              'Descriptions',
            ]"
            :content="[
              getStatistics?.categories,
              getStatistics?.subcategories,
              getStatistics?.objectives,
              getStatistics?.items,
              getStatistics?.descriptions,
            ]"
          />
        </Card>
      </Spacer>

      <Spacer>
        <Tip
          backgroundColour="#ffe5e5"
          borderColour="red"
          title="This guide is provided as is"
        >
          The coverage of this guide is not exhaustive. Some topics and
          specificities may not have been covered.
          <br />
          This guide is our heuristic, and we do not guarantee that a system
          will not have any vulnerabilities, errors, or issues once evaluated
          using <b>GASP</b>.
        </Tip>
      </Spacer>

      <div align="center">
        <router-link
          class="router-link"
          to="/evaluation"
          data-test="navToEvaluation"
        >
          <el-button type="primary"> Start the evaluation </el-button>
        </router-link>
      </div>
    </Content>
  </el-main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Content from "@/components/Content.vue";
import Spacer from "@/components/Spacer.vue";
import Card from "@/components/Card.vue";
import Uploader from "@/components/Uploader.vue";
import Objective from "@/components/Objective.vue";
import Columns from "@/components/Columns.vue";

import { initializeData } from "@/modules/dataHandler.js";

import router from "@/router";
import { RouterLink } from "vue-router";

import { ElMessageBox } from "element-plus";

import { useEvaluationStore } from "@/stores/evaluation";
import { storeToRefs } from "pinia";
import type { GuideData } from "@/types/interfaces/GuideData";

export default defineComponent({
  name: "ExplanationView",

  components: {
    Card,
    Content,
    Spacer,
    Uploader,
    Objective,
    RouterLink,
    Columns,
  },

  setup() {
    // Creating a reference to the Pinia store
    const evaluationStore = useEvaluationStore();

    // Creating references to store's getters and actions
    const { getStatistics } = storeToRefs(evaluationStore);

    // Making store's references available within the component
    return {
      getStatistics,
    };
  },

  methods: {
    /**
     * Handle clicks on the submit button of the custom guide content uploader.
     * Uses the Upload component, changes the guide's content and navigates to the Evaluation page.
     * @param { string } dataJson - The guide's content in a JSON format, automatically given by the Uploader component.
     */
    changeGuide(dataJson: string) {
      initializeData(JSON.parse(dataJson) as GuideData)
        .then(() => router.push({ path: "/evaluation" }))
        .catch((error) => {
          console.log(error);
          ElMessageBox.alert(error, "An error occured.");
        });
    },
  },
});
</script>

<style scoped>
.router-link {
  text-decoration: none;
  color: inherit;
}

.restore-collapse {
  font-size: inherit;
  --el-collapse-content-font-size: inherit;
  --el-collapse-header-font-size: inherit;
}
</style>

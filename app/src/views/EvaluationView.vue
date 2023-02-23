<template>
  <el-container v-if="getStatus">
    <Sidebar
      :activeSubcategory="routerActiveSubcategory"
      class="sidebar"
      :class="!isSidebarActive() ? 'hidden' : ''"
    />

    <template v-if="!isSidebarActive()">
      <div class="expend-menu" @click.stop="generalStore.toggleSidebar">
        <el-button type="primary" round class="expend-button">
          <el-icon>
            <ArrowRightBold />
          </el-icon>
        </el-button>
      </div>
    </template>

    <el-main>
      <Content class="content" :class="isSidebarActive() ? 'hidden' : ''">
        <Tip
          :title="
            routerActiveSubcategory +
            ' - ' +
            getSubcategory(routerActiveSubcategory)?.name
          "
          backgroundColour="white"
          borderColour="lightgrey"
        >
          {{ getSubcategory(routerActiveSubcategory)?.description }}
        </Tip>

        <Objective
          v-for="objective in getObjectivesFromSubcategory(
            routerActiveSubcategory
          )"
          :key="objective.PK"
          :objectiveName="objective.name"
          :objectivePK="objective.PK"
        />
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
import { defineComponent } from "vue";
import { useEvaluationStore } from "@/stores/evaluation";
import { storeToRefs } from "pinia";

import Sidebar from "@/components/Sidebar.vue";
import Content from "@/components/Content.vue";
import Card from "@/components/Card.vue";
import Objective from "@/components/Objective.vue";
import Tip from "@/components/Tip.vue";
import { useGeneralStore } from "@/stores/general";
import { ArrowRightBold } from "@element-plus/icons-vue";
import { ElMessageBox } from "element-plus";

export default defineComponent({
  name: "EvaluationView",

  components: {
    Sidebar,
    Content,
    Card,
    Objective,
    Tip,
    ArrowRightBold,
  },

  props: {
    // The active Subcategory's primary key
    routerActiveSubcategory: {
      type: String,
      required: true,
    },
  },

  setup() {
    // Creating a reference to the Pinia stores
    const evaluationStore = useEvaluationStore();
    const generalStore = useGeneralStore();

    // Creating references to stores' getters and actions
    const { getObjectivesFromSubcategory, getStatus, getSubcategory } =
      storeToRefs(evaluationStore);
    const { isSidebarActive } = storeToRefs(generalStore);

    // Making store's references available within the component
    return {
      getObjectivesFromSubcategory,
      getStatus,
      getSubcategory,
      generalStore,
      isSidebarActive,
    };
  },

  // Method runned when the component is created
  created() {
    ElMessageBox.alert(
      "Your progress and results are not saved locally: please do not refresh the page without saving your data by clicking on the corresponding buttons on the Evaluation and Results pages.",
      "Information"
    );
  },
});
</script>

<style scoped>
.el-aside {
  height: 100%;
}

.expend-menu {
  position: fixed;
  left: 30px;
  bottom: 30px;
  z-index: 999;
  opacity: 0.8;
}
.expend-menu .expend-button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.sidebar {
  transition: all 0.3s ease-out;
}

.content {
  max-width: 100%;
}

.sidebar.hidden {
  position: absolute;
  margin-left: -350px;
}

/* Was use to hide content on expended sidebar
@media screen and (max-width: 600px) {
	.content.hidden {
		display: none;
	}
} */
</style>

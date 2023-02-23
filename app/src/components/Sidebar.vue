<template>
  <el-menu
    class="sidebar-menu"
    :router="true"
    :default-active="activeSubcategory"
  >
    <div class="additional">
      <el-button @click.stop="generalStore.toggleSidebar">
        <el-icon class="el-icon--left">
          <CloseBold />
        </el-icon>
        Close menu
      </el-button>
    </div>
    <el-sub-menu
      v-for="category in getAllCategories"
      :key="category.id"
      :index="category.id.toString()"
      class="sub-menu"
      popper-class="disabled-popper"
    >
      <template #title>
        <span class="category">{{ category.id }} {{ category.name }}</span>
        <span
          class="completion-status"
          v-if="!isCategoryComplete(category.id)"
        />
      </template>
      <el-menu-item
        v-for="subcategory in getSubcategoriesFromCategory(category.id)"
        :key="subcategory.PK"
        :index="subcategory.PK.toString()"
        :route="/evaluation/ + subcategory.PK.toString()"
        data-test="subcategories"
      >
        <b>{{ subcategory.PK }} </b>
        <span class="subcategory-name" style="margin-left: 5px">{{
          subcategory.name
        }}</span>
        <span
          class="completion-status"
          v-if="!isSubcategoryComplete(subcategory.PK)"
        />
      </el-menu-item>
    </el-sub-menu>

    <div class="additional">
      <el-tooltip
        class="box-item"
        effect="dark"
        content="All items must be filled."
        placement="right"
        :disabled="isEvaluationComplete"
        v-if="isSidebarActive()"
      >
        <router-link
          to="/results"
          class="item-evaluation-button"
          data-test="navToResults"
        >
          <el-button type="primary" :disabled="!isEvaluationComplete">
            <el-icon class="el-icon--left">
              <Memo />
            </el-icon>
            Results
          </el-button>
        </router-link>
      </el-tooltip>
    </div>
    <div class="additional">
      <Downloader
        class="item-progress-button"
        v-if="isSidebarActive()"
        fileName="GASP_progress"
        buttonText="Save progress"
        buttonType=""
      />
    </div>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { useEvaluationStore } from "@/stores/evaluation";
import { storeToRefs } from "pinia";

import { Memo, CloseBold } from "@element-plus/icons-vue";

import Downloader from "@/components/Downloader.vue";

import { RouterLink } from "vue-router";
import { useGeneralStore } from "@/stores/general";

export default defineComponent({
  name: "Sidebar",

  components: {
    Memo,
    Downloader,
    RouterLink,
    CloseBold,
  },

  props: {
    // The active and displayed Subcategory's primary key
    activeSubcategory: {
      type: String,
      required: true,
    },
  },

  setup() {
    // Creating a reference to the Pinia stores
    const evaluationStore = useEvaluationStore();
    const generalStore = useGeneralStore();

    // Creating references to stores' getters and actions
    const {
      getSubcategoriesFromCategory,
      isSubcategoryComplete,
      isEvaluationComplete,
      isCategoryComplete,
      getAllCategories,
    } = storeToRefs(evaluationStore);
    const { isSidebarActive } = storeToRefs(generalStore);

    // Making store's references available within the component
    return {
      isEvaluationComplete,
      isSubcategoryComplete,
      isCategoryComplete,
      getAllCategories,
      getSubcategoriesFromCategory,
      isSidebarActive,
      generalStore,
    };
  },
});
</script>

<style>
.sidebar-menu,
.el-sub-menu__title,
.el-menu-item,
.el-menu-item > span {
  font-size: inherit;
}

.sidebar-menu {
  max-width: 350px;
}
.sidebar-menu .sub-menu .category {
  max-width: 95%;
}
.sidebar-menu .el-menu-item .subcategory-name {
  max-width: 86%;
}

.item-evaluation-button,
.item-evaluation-button {
  text-decoration: none !important;
}

.category {
  font-weight: bold;
}
.additional {
  justify-content: center;
  text-align: center;
  margin: 15px auto;
}

.collapse-trigger {
  background-color: rgba(50, 50, 50, 0.1);
}

.completion-status {
  margin-left: 5px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: rgb(255, 148, 148);
  border: 1px solid rgb(216, 0, 0);
}

.collapse-popper,
.disabled-popper {
  display: none;
}
</style>

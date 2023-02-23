<template>
  <h2>{{ objectiveName }}</h2>
  <el-card class="box-card-evaluation">
    <el-collapse class="el-collapse" accordion>
      <el-collapse-item
        v-for="item in getItemsFromObjective(objectivePK)"
        :key="item.PK"
        :name="item.name"
        :class="item.requirement"
        :disabled="getDescriptionsFromItem(item.PK).length === 0"
      >
        <template #title>
          <div class="item-wrapper">
            <div class="item-wrapper-name">
              <span class="item-title">{{ item.name }}</span>
            </div>
            <Topic :topic="item.topic" class="topics" />
            <ItemEvaluation
              :itemPK="item.PK"
              :demoMode="demoMode"
              class="item-evaluation"
            />
          </div>
        </template>
        <div v-if="getDescriptionsFromItem(item.PK).length">
          <!-- <el-divider class="inner-divider"/> -->
          <div
            v-for="description in getDescriptionsFromItem(item.PK)"
            :key="description.PK"
            class="description-p"
          >
            <p class="description-title">{{ description.name }}</p>
            <p>{{ description.value }}</p>

            <p v-if="description.link">
              <a
                class="description-link"
                :href="description.link"
                target="_blank"
              >
                <el-button class="el-button" plain>
                  {{ description.alt }}
                </el-button>
              </a>
            </p>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </el-card>
  <!--<el-divider />-->
</template>

<script lang="ts">
import { useEvaluationStore } from "@/stores/evaluation";
import { storeToRefs } from "pinia";

import { defineComponent } from "vue";
import Topic from "@/components/Topic.vue";
import ItemEvaluation from "@/components/ItemEvaluation.vue";

export default defineComponent({
  name: "Objective",

  components: {
    Topic,
    ItemEvaluation,
  },

  props: {
    // The name of the corresponding objective
    objectiveName: {
      type: String,
      required: false,
    },
    // The primary key of the corresponding objective
    objectivePK: {
      type: String,
      required: true,
    },
    // Whether the clicks on the evalaution box must change the store states
    demoMode: {
      type: Boolean,
      required: false,
    },
  },

  setup() {
    // Creating a reference to the Pinia store
    const evaluationStore = useEvaluationStore();

    // Creating references to store's getters and actions
    const { getItemsFromObjective, getDescriptionsFromItem } =
      storeToRefs(evaluationStore);

    // Making store's references available within the component
    return {
      getItemsFromObjective,
      getDescriptionsFromItem,
    };
  },
});
</script>

<style>
.box-card-evaluation > .el-card__body {
  border: none;
  padding: 0;
}

.box-card-evaluation .el-collapse {
  --el-collapse-header-height: inherit !important;
  --el-collapse-border-color: none !important;
}

.box-card-evaluation .el-collapse .el-collapse-item {
  border-top: 0.25px solid rgba(0, 0, 0, 0.05);
  border-bottom: 0.25px solid rgba(0, 0, 0, 0.05);
}
.box-card-evaluation .el-collapse .el-collapse-item:first-child {
  border-top: none;
}
.box-card-evaluation .el-collapse .el-collapse-item:last-child {
  border-bottom: none;
}

.item-wrapper {
  width: 97%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
  align-content: center;
  line-height: 150%;
}

.item-wrapper .item-wrapper-name {
  margin-left: 0px;
  width: 100%;
  padding-right: 10px;
}

.item-wrapper .topic-container {
  margin: 0 20px;
}

.box-card-evaluation .el-collapse-item__header {
  background-color: inherit;
  border-bottom: none;
  justify-content: space-between !important;
}
.box-card-evaluation .el-collapse-item__wrap {
  background-color: inherit;
  border-bottom: none;
  margin-top: 5px;
}
.box-card-evaluation .el-collapse-item {
  padding: 15px 20px;
}
.box-card-evaluation .el-collapse-item.c {
  background-color: #cce5cc;
}
.box-card-evaluation .el-collapse-item.s {
  background-color: #ffffcc;
}
.box-card-evaluation .el-collapse-item.m {
  background-color: #ffcccc;
}
.box-card-evaluation .el-collapse-item div {
  background-color: inherit;
  border-bottom: none;
}

.box-card-evaluation .el-collapse-item.is-disabled .el-collapse-item__header {
  color: inherit !important;
  cursor: inherit !important;
}
.box-card-evaluation
  .el-collapse-item.is-disabled
  .el-collapse-item__header
  .el-collapse-item__arrow {
  opacity: 0;
}
.box-card-evaluation .el-icon.el-collapse-item__arrow {
  color: black;
  margin-left: 20px;
  margin-right: 0;
}

.box-card-evaluation .el-collapse-item__content {
  padding: 0 !important;
}

.topics {
  margin-left: 16px;
  width: 7%;
}

.item-title {
  font-weight: 300;
  line-height: 26px;
  color: black;
}

.description-p {
  margin-top: 20px;
}
.description-p > .description-title {
  padding: 10px;
  font-weight: bold;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}
.description-p > p {
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 5px;
  margin-bottom: 10px;
}

.description-link .el-button {
  background-color: rgba(255, 255, 255, 0.6);
  color: #343434;
}
.description-link .el-button:hover {
  background-color: rgba(255, 255, 255, 0.8);
  color: black;
  border-color: black;
}

/* Same space for collapse item and for the collapser icon*/
.item-wrapper .el-icon {
  margin-left: 20px !important;
}

@media screen and (max-width: 600px) {
  .el-collapse-item {
    padding: 5px 10px;
  }
  .description-p {
    margin-top: 10px;
  }
  .description-p > .description-title {
    padding: 5px;
  }
  .description-p > p {
    padding: 5px;
    margin: 5px;
  }
}
</style>

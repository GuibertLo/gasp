<template>
  <div
    class="checkbox"
    @click.stop="click"
    align="center"
    data-test="checkboxes"
  >
    <el-icon v-if="getItemEvaluation(itemPK) == 0" class="icon">
      <CloseBold />
    </el-icon>
    <el-icon v-else-if="getItemEvaluation(itemPK) == 1" class="icon">
      <Select />
    </el-icon>
    <el-icon v-else-if="getItemEvaluation(itemPK) == 2" class="icon">
      <SemiSelect />
    </el-icon>
    <span v-else style="display: inline-block; width: 100%; height: 100%">
    </span>
  </div>
</template>

<script lang="ts">
import { useEvaluationStore } from "@/stores/evaluation";
import { storeToRefs } from "pinia";

import { defineComponent } from "vue";
import { Evaluations } from "@/types/enums/Evaluations";
import { CloseBold, Select, SemiSelect } from "@element-plus/icons-vue";

export default defineComponent({
  name: "ItemEvaluation",

  components: {
    CloseBold,
    Select,
    SemiSelect,
  },

  setup() {
    // Creating a reference to the Pinia store
    const evaluationStore = useEvaluationStore();

    // Creating references to store's getters and actions
    const { getItemEvaluation } = storeToRefs(evaluationStore);

    // Making store's references available within the component
    return {
      getItemEvaluation,
      evaluationStore,
    };
  },

  props: {
    // The corresponding Item's primary key
    itemPK: {
      type: String,
      required: true,
    },
    // Whether the clicks on the evalaution box must change the store states
    demoMode: {
      type: Boolean,
      required: false,
    },
  },

  methods: {
    /**
     * Handle clicks on the evaluation box and changes the Item's evaluation value.
     */
    click(): void {
      // Getting the stored Item's evaluation value
      let oldValue = this.getItemEvaluation(this.itemPK) as
        | Evaluations
        | undefined;
      let newValue = undefined as Evaluations | undefined;
      // Setting the new value based on the old one
      switch (oldValue) {
        case undefined:
          newValue = Evaluations.checked;
          break;
        case Evaluations.checked:
          newValue = Evaluations.unchecked;
          break;
        case Evaluations.unchecked:
          newValue = Evaluations.unrelated;
          break;
        case Evaluations.unrelated:
          newValue = Evaluations.checked;
          break;
        default:
          newValue = Evaluations.checked;
          break;
      }
      // Sends the new value to the store if demo mode not enabled
      if (!this.demoMode)
        this.evaluationStore.setCheckbox(newValue, oldValue, this.itemPK);
    },
  },
});
</script>

<style scoped>
.checkbox.item-evaluation {
  border-radius: 5px;
  border: 1px solid rgb(151, 151, 151);
  background-color: rgba(255, 255, 255, 0.7);
  min-width: 30px;
  min-height: 30px;
  position: relative;
  text-align: center;
}
.checkbox.item-evaluation .icon {
  display: inline-flex;
  text-align: center;
  margin: 0 auto !important;
  position: absolute;
  top: 50%;
  left: 23%;
  transform: translateY(-50%);
}

@media screen and (max-width: 600px) {
  .checkbox.item-evaluation {
    min-width: 20px;
    min-height: 20px;
  }
}
</style>

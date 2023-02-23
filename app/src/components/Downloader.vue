<template>
  <a @click.stop="download" :href="myUrl" :download="myFilename">
    <el-button>
      <el-icon class="el-icon--left">
        <Download />
      </el-icon>
      {{ buttonText }}
    </el-button>
  </a>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { Download } from "@element-plus/icons-vue";

import { useEvaluationStore } from "@/stores/evaluation";
import { storeToRefs } from "pinia";
import type { StoredItems } from "@/types/interfaces/StoredItems";
import type { StoredResults } from "@/types/interfaces/StoredResults";
import { ElButton, ElIcon } from "element-plus";
import type { EpPropMergeType } from "element-plus/es/utils/vue/props/types";

export default defineComponent({
  setup() {
    // Creating a reference to the Pinia store
    const evaluationStore = useEvaluationStore();

    // Creating references to store's getters and actions
    const { getAllItems, getHash, getWholeGuide } =
      storeToRefs(evaluationStore);

    // Making store's references available within the component
    return {
      getAllItems,
      getHash,
      getWholeGuide,
      ElButton,
      ElIcon,
    };
  },

  name: "Downloader",

  props: {
    // The name given to the file
    fileName: {
      type: String,
      required: true,
    },
    // The text displayed in the button
    buttonText: {
      type: String,
      required: true,
    },
  },

  data() {
    // Used to make the JSON file downloadable
    return {
      myUrl: "#",
      myFilename: "",
    };
  },

  components: {
    Download,
  },

  methods: {
    /**
     * Handles clicks on the download button, prepares the file and allows its download.
     */
    download(): void {
      const itemData = this.getAllItems.map((item) => {
        return (({ PK, evaluation }) => ({ PK, evaluation }))(item);
      }) as StoredItems[];

      const storedItems = {
        checkHash: this.getHash,
        items: itemData,
        evaluation: this.getWholeGuide,
      } as StoredResults;

      const jsonData = encodeURIComponent(JSON.stringify(storedItems));
      this.myUrl = `data:text/plain;charset=utf-8,${jsonData}`;
      this.myFilename = this.fileName + ".json";
    },
  },
});
</script>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
}
</style>

<template>
  <div class="common-layout">
    <el-container>
      <el-header class="el-header">
        <Topbar />
      </el-header>
      <el-container>
        <RouterView />
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { RouterView } from "vue-router";
import Topbar from "./components/Topbar.vue";

import { initializeData } from "@/modules/dataHandler";
import { ElMessageBox } from "element-plus";

export default defineComponent({
  components: {
    Topbar,
    RouterView,
  },

  // Method runned when the component is created, to populate the guide's content
  created() {
    initializeData()
      .then((message) => console.log(message))
      .catch((error) => {
        ElMessageBox.alert(
          error + " Please contact the administrator.",
          "An error occured."
        );
      });
  },
});
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background-color: #f5f5f5;
}

.el-header {
  --el-header-height: inherit;
  padding: 0 !important;
}
</style>

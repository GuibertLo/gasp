<template>
  <el-main>
    <Content>
      <div>
        <h1>Restore your results or progress</h1>

        <p>
          You can upload a JSON file containing your results and progress in an
          evaulation you have not finished. You will then be redirected to
          either the results page or the evaluation page.
        </p>
      </div>
      <Uploader
        :callback="submitUpload"
        tooltip="Single json file with a size smaller than 16MB."
        accept=".json, .JSON"
        fileType="application/json"
      />
    </Content>
  </el-main>
</template>

<script lang="ts" setup>
import Content from "@/components/Content.vue";

import { ElMessageBox } from "element-plus";

import Uploader from "@/components/Uploader.vue";

import { restoreResultsFromFile } from "@/modules/dataHandler";
import router from "@/router";

import { useEvaluationStore } from "@/stores/evaluation";

// Creating a reference to the Pinia store
const evaluationStore = useEvaluationStore();

/**
 * Handle clicks on the submit button of the result restoration uploader.
 * Uses the Upload component, changes the guide's results and navigates to the Results page.
 * @param { string } dataJson - The guide's results in a JSON format, automatically given by the Uploader component.
 */
const submitUpload = (dataJson: string) => {
  restoreResultsFromFile(dataJson)
    .then((sameGuide) => {
      // Showing a dialog if the guide's content used for the progress or results was customized or is outdated
      if (!sameGuide)
        ElMessageBox.alert(
          "Your saved results or progress has been generated using either an old version of the guide content, or using a custom guide content. If you did not change the guide content, your results or progress are outdated. The application has loaded the old guide content, but please consider to re-evaluate your system from scratch to include the lastest updates.",
          "Information"
        );

      // Redirect user to the corresponding page based on restoration of results or progress
      if (evaluationStore.isEvaluationComplete)
        router.push({ path: "/results" });
      else router.push({ path: "/evaluation" });
    })
    .catch((error) => {
      console.log(error);
      ElMessageBox.alert(error, "An error occured.");
    });
};
</script>

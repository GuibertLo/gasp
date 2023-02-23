<template>
  <Card title="">
    <el-upload
      v-model:file-list="fileList"
      class="upload"
      action="/"
      :on-error="handleError"
      :limit="1"
      :on-exceed="handleExceed"
      :accept="accept"
      :auto-upload="false"
      drag
    >
      <el-icon class="el-icon--upload">
        <upload-filled />
      </el-icon>
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          {{ tooltip }}
        </div>
      </template>
    </el-upload>

    <el-button
      type="primary"
      class="upload-button"
      @click="submitUpload(callback, fileType)"
      :disabled="fileList.length !== 1"
    >
      Submit file
    </el-button>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Card from "@/components/Card.vue";

import { ref } from "vue";
import { ElMessageBox } from "element-plus";
import type { UploadProps, UploadUserFile } from "element-plus";
import { UploadFilled } from "@element-plus/icons-vue";

export default defineComponent({
  name: "Uploader",

  components: {
    Card,
    UploadFilled,
  },

  props: {
    // The function that must be executed when the Uploader has completed its task
    callback: {
      required: true,
      type: Function,
    },
    // The text that is displayed below the upload box
    tooltip: {
      required: true,
      type: String,
    },
    /* The file formats that can be accepted within the device file system.
		A string that contains one of more file extensions separed by commas. Example : ".json, .JSON" */
    accept: {
      required: true,
      type: String,
    },
    /* The MIME file type that can be uploaded, based on the file type standard.
		Refers to Common MIME types. */
    fileType: {
      required: true,
      type: String,
    },
  },

  setup() {
    // Stores the uploaded list of files
    const fileList = ref<UploadUserFile[]>([]);

    /**
     * Handle clicks on the upload buttom and checks the file attributes.
     * @param { Function } callback - The function that must be executed when the Uploader has completed its task.
     * @param { string } fileType - The MIME file type that can be uploaded, based on the file type standard. Refers to Common MIME types.
     */
    const submitUpload = (callback: Function, fileType: string): void => {
      if (fileList.value[0].raw?.type !== fileType) {
        ElMessageBox.alert(
          "The file must be in the JSON format.",
          "An error occured."
        );
      } else if (fileList.value[0].raw?.size / 1024 / 1024 > 16) {
        ElMessageBox.alert(
          "The file must not be larger than 16MB.",
          "An error occured."
        );
      } else {
        fileList.value[0].raw
          ?.text()
          .then((data) => {
            callback(data);
          })
          .catch((error) => {
            console.log(error);
            ElMessageBox.alert(
              "The file content could not be read.",
              "An error occured."
            );
          });
      }
    };

    /**
     * Handle errors when the amount uploaded file exceeds the limit.
     */
    const handleExceed: UploadProps["onExceed"] = (): void => {
      ElMessageBox.alert("Please select only one file.", "An error occured.");
    };

    /**
     * Handle errors when uploaded file raises an error.
     */
    const handleError: UploadProps["onError"] = (): void => {
      ElMessageBox.alert(
        "Please contact the administrator.",
        "An error occured."
      );
    };

    // Making variables and functions available within the component
    return {
      fileList,
      submitUpload,
      handleExceed,
      handleError,
    };
  },
});
</script>

<style>
.upload,
.el-upload__text,
.el-upload__tip,
.el-upload-list,
.el-upload-list__item-info,
.el-upload-list__item-file-name {
  font-size: inherit !important;
  --el-menu-item-font-size: inherit !important;
}

.el-upload-list__item {
  background-color: #ddd;
  padding: 5px 10px;
}

.el-upload-list__item-file-name {
  font-weight: bold;
}

.upload-button {
  margin-top: 20px;
}
</style>

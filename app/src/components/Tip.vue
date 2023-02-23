<template>
  <div
    class="tip"
    :style="
      'background-color:' +
      backgroundColour +
      ' ; border-left-color: ' +
      borderColour +
      ';'
    "
  >
    <p class="title">{{ title }}</p>
    <p class="content">
      <slot></slot>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Tip",

  props: {
    // The value used for the color of the left border
    borderColour: {
      type: String,
      required: true,
    },
    // The value used for the color of the background
    backgroundColour: {
      type: String,
      required: true,
    },
    // The value to be display as the Tip title
    title: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>
.tip {
  padding: 16px 16px;
  border-radius: 4px;
  border-left-width: 5px;
  border-left-style: solid;
  margin: 20px 0;
}
.tip .title {
  font-weight: bold;
  margin-top: 0px;
}
.tip .content {
  margin-bottom: 0px;
}
</style>

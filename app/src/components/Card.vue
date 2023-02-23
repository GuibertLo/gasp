<template>
  <el-card class="box-card">
    <template v-if="title.length" #header>
      <div class="card-header">
        <h3>{{ title }}</h3>
      </div>
    </template>
    <div class="card-content">
      <slot> </slot>
    </div>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Card",

  props: {
    title: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
}

.box-card {
  color: inherit;
  background-color: white;
}

.card-header > h3 {
  margin: 0 0 !important;
}
</style>

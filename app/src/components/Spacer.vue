<template>
  <div class="spacer">
    <slot> </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Spacer",
});
</script>

<style scoped>
.spacer {
  margin-bottom: 35px;
}
</style>

<template>
  <el-menu
    class="el-menu"
    mode="horizontal"
    :ellipsis="false"
    background-color="white"
    :router="true"
  >
    <el-menu-item
      class="el-menu-item"
      index="0"
      style="margin: 0 auto"
      route="/"
    >
      <img
        alt="GASP logo"
        class="logo"
        src="@/assets/logo.svg"
        width="40"
        height="40"
      />
      <b>GASP</b>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Topbar",
});
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}

.router-link {
  text-decoration: none;
}

.el-menu-item {
  font-size: 18px;
}

.el-menu-item:hover,
.el-menu-item:focus {
  background-color: inherit !important;
}

.logo {
  padding: 10px;
  padding-left: 0;
}
</style>

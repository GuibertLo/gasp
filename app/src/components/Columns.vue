<template>
  <div v-if="isValid" class="columns-wrapper">
    <div class="columns">
      <span
        v-for="header in headers"
        :key="(header as string)"
        :style="'width:' + 100 / headers.length + '%'"
      >
        {{ header }}
      </span>
    </div>

    <div class="columns">
      <span
        v-if="!iconMode"
        v-for="item in content"
        :key="(item as string)"
        :style="{ width: 100 / headers.length + '%' }"
      >
        {{ item }}
      </span>
      <span
        v-else
        v-for="item in content"
        :key="(item as string) + ' icons'"
        :style="{ width: 100 / headers.length + '%' }"
      >
        <el-icon class="icon" v-if="item === 'Select'">
          <Select />
        </el-icon>
        <el-icon class="icon" v-if="item === 'CloseBold'">
          <CloseBold />
        </el-icon>
        <el-icon class="icon" v-if="item === 'SemiSelect'">
          <SemiSelect />
        </el-icon>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { CloseBold, Select, SemiSelect } from "@element-plus/icons-vue";

export default defineComponent({
  name: "Columns",

  components: {
    CloseBold,
    Select,
    SemiSelect,
  },

  props: {
    // The values used for the head of the columns
    headers: {
      type: Array,
      required: true,
    },
    // The data used for the content of the columns
    content: {
      type: Array,
      required: true,
    },
    // The data used for the content of the columns
    iconMode: {
      type: Boolean,
      required: false,
    },
  },

  computed: {
    /**
     * Determine whether the amount of items in each array is the same.
     * @returns { boolean } Whether the two props have the same amount of items
     */
    isValid(): boolean {
      return this.headers.length === this.content.length;
    },
  },
});
</script>

<style scoped>
.columns {
  display: flex;
  align-items: center;
  align-content: space-between;
  flex-wrap: nowrap;
}

.columns:first-child {
  font-weight: bold;
}

.columns span {
  display: inline-block;
  margin: 0 auto;
  text-align: center;
  border-left: 1px solid #adadad;
}

.columns:first-child span {
  padding-bottom: 15px;
}

.columns span:first-child {
  border-left: none;
}

@media screen and (max-width: 600px) {
  .columns-wrapper {
    display: flex;
    align-items: center;
    align-content: center;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: center;
  }

  .columns {
    flex-direction: column;
  }

  .columns:first-child {
    margin-right: 20px;
  }

  .columns:first-child span {
    padding-bottom: 0;
  }

  .columns span {
    width: 100% !important;
    text-align: left;
    margin-bottom: 5px;
    border: none;
  }
}
</style>

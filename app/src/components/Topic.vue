<template>
  <div class="topic-container">
    <span
      class="topic"
      v-for="singleTopic in extractTopics(topic)"
      :key="singleTopic"
    >
      {{ singleTopic }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Topic",

  props: {
    // The value of the Item's topic
    topic: {
      type: String,
      required: true,
    },
  },

  methods: {
    /**
     * Split the topic value in characters to display them individually.
     * @param { String } value - The value of the topic
     * @return { string[] } An array containing each character in alphabetical order.
     */
    extractTopics(value: String): string[] {
      return value.split("").sort();
    },
  },
});
</script>

<style scoped>
.topic-container {
  text-align: center;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: right;
  align-items: center;
  align-content: center;
}
.topic-container .topic:last-child {
  margin-left: 5px;
}

.topic {
  text-align: center;
  font-size: 15px;
  font-weight: bold;
  padding: 3px;
  border-radius: 50%;
  border: 1px solid rgb(129, 129, 129);
  background-color: rgba(0, 0, 0, 0.1);
  color: #646464;
  min-width: 20px;
  min-height: 20px;
  max-width: 20px;
  max-height: 20px;
  line-height: 20px;
}

@media screen and (max-width: 1200px) {
  .topic {
    font-size: 12px;
  }
}

@media screen and (max-width: 600px) {
  .topic {
    font-size: 9px;
    min-width: 15px;
    min-height: 15px;
    max-width: 15px;
    max-height: 15px;
    line-height: 15px;
  }
  .topic-container .topic:last-child {
    margin-left: 0px;
  }

  .topic-container {
    flex-direction: column;
  }
}
</style>

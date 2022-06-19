<script setup lang="ts">
import { ref } from "vue";
import FilterTag from "./FilterTag.vue";

const selectedTagIndex = ref(0);
const tags = ['全部固定', '过期', '今天', '明天', '本周', '稍后'];
</script>

<template>
  <div class="filter-tag-group">
    <FilterTag v-for="(tag, index) in tags" :text="tag" :selected="selectedTagIndex == index"
      @click="selectedTagIndex = index, $emit('filterBy', index)" />
  </div>
</template>
<script setup lang="ts">
import { useHomeStore } from "@/stores/home";
import { storeToRefs } from "pinia";
import IconList from "../icon/IconList.vue";

const props = defineProps<{
  name: string
}>();

const homeStore = useHomeStore();
const { activeNav } = storeToRefs(homeStore);
</script>

<template>
  <div class="custom-list-item" :class="{ selected: activeNav === `list_${name}` }" @click="activeNav = `list_${name}`">
    <div class="icon-wrapper">
      <IconList style="fill: #5c70bf;" />
    </div>
    <div class="text-wrapper">
      {{ name }}
    </div>
  </div>
</template>

<style>
.custom-list-item {
  padding: 5px 10px;
  cursor: pointer;
}

.custom-list-item.selected {
  background-color: #d3d3d3;
}
</style>
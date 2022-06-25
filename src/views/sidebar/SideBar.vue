<script setup lang="ts">
import { useHomeStore } from "@/stores/home";
import { storeToRefs } from "pinia";
import TaskAdvice from "./advice/TaskAdvice.vue";
import TaskDetail from "./detail/TaskDetail.vue";

const homeStore = useHomeStore();
const { activeSideBar } = storeToRefs(homeStore);
</script>

<template :key="activeSideBar">
  <div class="side-bar">
    <TaskAdvice v-if="activeSideBar === 'advice'" />
    <TaskDetail v-else-if="activeSideBar.startsWith('task_')" />
  </div>
</template>

<style>
.side-bar {
  width: 260px;
  height: 100%;
  border-radius: 0 10px 10px 0;
  display: inline-block;
  padding: 40px 20px;
  box-sizing: border-box;
  background-color: #fff;
}
</style>
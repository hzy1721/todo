<script setup lang="ts">
import { useHomeStore } from '@/stores/home';
import type { Task } from '@/models/Task';
import { storeToRefs } from 'pinia';
import IconDone from './IconDone.vue';
import IconStar from './IconStar.vue';

const props = defineProps<{
  task: Task
}>();

const homeStore = useHomeStore();
const { activeSideBar } = storeToRefs(homeStore);
</script>

<template>
  <div class="task-list-item" :selected="activeSideBar === `task_${task.id}`">
    <IconDone :task="task" />
    <div class="task-name" @click="activeSideBar = `task_${task.id}`">
      <div class="title">{{ task.name }}</div>
      <div class="subtitle">任务</div>
    </div>
    <IconStar :task="task" />
  </div>
</template>

<style>
.task-list-item {
  background-color: white;
  border-radius: 3px;
  margin-bottom: 1px;
  height: 44px;
  box-sizing: border-box;
  position: relative;
  display: flex;
}

.task-list-item[selected="true"] {
  opacity: 0.7;
}

.task-list-item .icon-done {
  display: inline-block;
  padding: 9px;
}

.task-list-item .task-name {
  display: inline-block;
  vertical-align: top;
  margin-left: 10px;
  padding-top: 4px;
  flex: 1;
}

.task-list-item .task-name .title {
  line-height: 20px;
  color: #3b3e43;
}

.task-list-item .task-name .subtitle {
  font-size: 13px;
  line-height: 15px;
  color: #767678;
}

.task-list-item .icon-star {
  display: inline-block;
  vertical-align: top;
  position: absolute;
  right: 9px;
  padding: 9px 0;
}
</style>
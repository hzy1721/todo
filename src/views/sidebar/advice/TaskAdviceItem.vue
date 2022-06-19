<script setup lang="ts">
import type { Task } from '@/models/Task';
import IconDone from '../../task/IconDone.vue';
import { db } from '@/stores/db';
import IconAdd from '../../icon/IconAdd.vue';

const props = defineProps<{
  task: Task
}>();

async function addToday() {
  await db.tasks.where('id').equals(props.task.id!).modify({todayTime: new Date()});
}
</script>

<template>
  <div class="task-advice-item">
    <IconDone :task="task" />
    <div class="task-name">
      <div class="title">{{ task.name }}</div>
      <div class="subtitle">任务</div>
    </div>
    <div class="icon-add-today icon-star" @click="addToday" title="添加到“我的一天”">
      <IconAdd style="width: 25px; height: 25px; fill: #486AE3;" />
    </div>
  </div>
</template>

<style>
.task-advice-item {
  margin-bottom: 1px;
  height: 44px;
  box-sizing: border-box;
  position: relative;
}

.task-advice-item .icon-done {
  display: inline-block;
  padding: 9px;
}

.task-advice-item .task-name {
  display: inline-block;
  vertical-align: top;
  margin-left: 10px;
  padding-top: 4px;
}

.task-advice-item .task-name .title {
  line-height: 20px;
  color: #3b3e43;
}

.task-advice-item .task-name .subtitle {
  font-size: 13px;
  line-height: 15px;
  color: #767678;
}

.task-advice-item .icon-star {
  display: inline-block;
  vertical-align: top;
  position: absolute;
  right: 9px;
  padding: 9px 0;
}
</style>
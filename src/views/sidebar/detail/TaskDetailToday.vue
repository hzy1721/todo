<script setup lang="ts">
import type { Task } from '@/models/Task';
import { timeInToday } from '@/scripts/utils';
import { updateTask } from '@/scripts/utils';
import IconSun from "../../icon/IconSun.vue";
import IconCancel from "../../icon/IconCancel.vue";

const props = defineProps<{
  task: Task | undefined
}>();
</script>

<template>
  <div class="today">
    <template v-if="task && !timeInToday(task.todayTime)">
      <div class="icon-wrapper">
        <IconSun style="width: 20px; height: 20px; fill: #767678;" />
      </div>
      <div class="middle-text" style="color: #767678;" @click="updateTask({ todayTime: new Date() })">
        添加到“我的一天”
      </div>
    </template>
    <template v-else>
      <div class="icon-wrapper">
        <IconSun style="width: 20px; height: 20px; fill: #6D7FC8;" />
      </div>
      <div class="middle-text" style="color: #6D7FC8;">
        已添加到“我的一天”
      </div>
      <div class="icon-wrapper" @click="updateTask({ todayTime: null })">
        <IconCancel style="width: 20px; height: 20px; fill: #767678;" />
      </div>
    </template>
  </div>
</template>

<style lang="scss">
.task-detail {

  .today {
    margin: 15px 0;
  }
}
</style>
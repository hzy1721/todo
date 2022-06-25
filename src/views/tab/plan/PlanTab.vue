<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { from, useObservable } from '@vueuse/rxjs';
import { liveQuery } from 'dexie';
import { db } from '@/stores/db';
import TabContentTitle from '../TabContentTitle.vue';
import PlanMenu from './PlanMenu.vue';
import TaskList from '../../task/TaskList.vue';
import AddNewTask from '../../task/AddNewTask.vue';
import FilterTagGroup from './FilterTagGroup.vue';
import type { Task } from '@/models/Task';
import IconPlanTabHint from '@/views/icon/IconPlanTabHint.vue';
undefined

const tab = useObservable(
  from(
    liveQuery(() => {
      return db.tabs.get('plan');
    })
  )
);

const originTasks = useObservable(
  from(
    liveQuery(() => {
      return db.tasks.filter((task) => {
        return task.dueTime != null || task.remindTime != null;
      }).toArray();
    })
  )
);

const nowTime = new Date();
const todayStart = new Date(nowTime.getFullYear(), nowTime.getMonth(), nowTime.getDate());
const todayEnd = new Date(nowTime.getFullYear(), nowTime.getMonth(), nowTime.getDate() + 1);
const tomorrowEnd = new Date(nowTime.getFullYear(), nowTime.getMonth(), nowTime.getDate() + 2);
const weekStart = new Date(nowTime.getFullYear(), nowTime.getMonth(), nowTime.getDate() - nowTime.getDay());
const weekEnd = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 7);
const maxEnd = weekEnd > tomorrowEnd ? weekEnd : tomorrowEnd;

function timeInRange(time: Date | null, left: Date | null, right: Date | null): boolean {
  if (!time)
    return false;
  if (left && time <= left)
    return false;
  if (right && time > right)
    return false;
  return true;
}

const taskFilters = [
  (task: Task) => {
    return true;
  },
  (task: Task) => {
    return timeInRange(task.dueTime, null, todayStart)
      || timeInRange(task.remindTime, null, todayStart);
  },
  (task: Task) => {
    return timeInRange(task.dueTime, todayStart, todayEnd)
      || timeInRange(task.remindTime, todayStart, todayEnd)
  },
  (task: Task) => {
    return timeInRange(task.dueTime, todayEnd, tomorrowEnd)
      || timeInRange(task.remindTime, todayEnd, tomorrowEnd)
  },
  (task: Task) => {
    return timeInRange(task.dueTime, weekStart, weekEnd)
      || timeInRange(task.remindTime, weekStart, weekEnd)
  },
  (task: Task) => {
    return timeInRange(task.dueTime, maxEnd, null)
      || timeInRange(task.remindTime, maxEnd, null)
  }
];

const taskFilter = ref(taskFilters[0]);

const tasks = computed(() => {
  return originTasks.value?.filter(taskFilter.value);
});
</script>

<template>
  <div class="plan-tab tab-content" :theme="tab ? tab.theme : 'light-green'">
    <TabContentTitle class="tab-content-title" title="计划内" />

    <PlanMenu />

    <FilterTagGroup @filterBy="(filterIndex) => { taskFilter = taskFilters[filterIndex] }" />

    <TaskList v-if="tasks?.length"
        :tasks="tasks" 
        :sort-key="tab?.sortKey" 
        :sort-reverse="tab?.sortReverse" 
        :show-done="tab?.showDone"
        :group-key="tab?.groupKey" 
        :show-empty="tab?.theme.startsWith('dark') || tab?.theme.startsWith('light')"
        style="height: 480px;" />

    <div class="no-result" v-else>
      <IconPlanTabHint />
      <div class="tips" style="font-weight: bold; margin-top: 30px; line-height: 20px;">此处显示带有截止日期或提醒的任务。</div>
    </div>

    <AddNewTask :due-time="todayEnd" />
  </div>
</template>
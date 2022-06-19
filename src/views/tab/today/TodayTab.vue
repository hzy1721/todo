<script setup lang="ts">
import { db } from '@/stores/db';
import { liveQuery } from 'dexie';
import { from, useObservable } from '@vueuse/rxjs';
import { ref, computed, onMounted, onUnmounted } from 'vue';

import TabContentTitle from '../TabContentTitle.vue';
import TodayMenu from './TodayMenu.vue';
import TaskList from '../../task/TaskList.vue';
import AddNewTask from '../../task/AddNewTask.vue';

// metadata
const tab = useObservable(
  from(
    liveQuery(() => {
      return db.tabs.get('today');
    })
  )
);

// task list
const nowDate = new Date();
const todayStart = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate());
const todayEnd = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 1);
const tasks = useObservable(
  from(
    liveQuery(() => {
      return db.tasks.where('todayTime').between(todayStart, todayEnd)
        .toArray();
    })
  )
);
</script>

<template>
  <div class="today-tab tab-content" :theme="tab ? tab.theme : 'light-blue'">
    <TabContentTitle class="tab-content-title" title="我的一天"
      :subtitle="`${nowDate.getMonth() + 1}月${nowDate.getDate()}日 星期${['日', '一', '二', '三', '四', '五', '六'][nowDate.getDay()]}`" />

    <TodayMenu />

    <TaskList :tasks="tasks" 
        :sort-key="tab?.sortKey" 
        :sort-reverse="tab?.sortReverse" 
        :show-done="tab?.showDone"
        :group-key="tab?.groupKey" 
        :show-empty="tab?.theme.startsWith('dark') || tab?.theme.startsWith('light')" />

    <AddNewTask :today="true" />
  </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { from, useObservable } from '@vueuse/rxjs';
import { liveQuery } from 'dexie';
import { db } from '@/stores/db';
import TabContentTitle from '../TabContentTitle.vue';
import TaskMenu from './TaskMenu.vue';
import TaskList from '../../task/TaskList.vue';
import AddNewTask from '../../task/AddNewTask.vue';

const tab = useObservable(
  from(
    liveQuery(() => {
      return db.tabs.get('task');
    })
  )
);

const tasks = useObservable(
  from(
    liveQuery(() => {
      return db.tasks.where('list').equals('').toArray();
    })
  )
);
</script>

<template>
  <div class="task-tab tab-content" :theme="tab ? tab.theme : 'dark-blue'">
    <TabContentTitle class="tab-content-title" title="任务" />

    <TaskMenu />

    <TaskList :tasks="tasks" 
        :sort-key="tab?.sortKey" 
        :sort-reverse="tab?.sortReverse" 
        :show-done="tab?.showDone"
        :group-key="tab?.groupKey" 
        :show-empty="tab?.theme.startsWith('dark') || tab?.theme.startsWith('light')" />

    <AddNewTask />
  </div>
</template>
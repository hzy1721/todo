<script setup lang="ts">
import { useHomeStore } from '@/stores/home';
import { from, useObservable } from '@vueuse/rxjs';
import { liveQuery } from 'dexie';
import { db } from '@/stores/db';
import CustomListTitle from './CustomListTitle.vue';
import CustomListMenu from './CustomListMenu.vue';
import TaskList from '../../task/TaskList.vue';
import AddNewTask from '../../task/AddNewTask.vue';

// metadata
const homeStore = useHomeStore();
const name = homeStore.activeNav.slice(5);
const tab = useObservable(
  from(
    liveQuery(() => {
      return db.lists.get(name);
    })
  )
);

// task list
const tasks = useObservable(
  from(
    liveQuery(() => {
      return db.tasks.where('list').equals(name).toArray();
    })
  )
);
</script>

<template>
  <div class="tab-content" :theme="tab ? tab.theme : 'dark-blue'">
    <CustomListTitle :name="name" />

    <CustomListMenu />

    <TaskList :tasks="tasks" 
        :sort-key="tab?.sortKey" 
        :sort-reverse="tab?.sortReverse" 
        :show-done="tab?.showDone"
        :group-key="tab?.groupKey" 
        :show-empty="tab?.theme.startsWith('dark') || tab?.theme.startsWith('light')" />

    <AddNewTask />
  </div>
</template>
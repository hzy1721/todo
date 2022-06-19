<script setup lang="ts">
import { from, useObservable } from '@vueuse/rxjs';
import { liveQuery } from 'dexie';
import { db } from '@/stores/db';

import TabContentTitle from '../TabContentTitle.vue';
import StarMenu from './StarMenu.vue';
import TaskList from '../../task/TaskList.vue';
import AddNewTask from '../../task/AddNewTask.vue';
import IconStarTabHint from '@/views/icon/IconStarTabHint.vue';

const tab = useObservable(
  from(
    liveQuery(() => {
      return db.tabs.get('star');
    })
  )
);

const tasks = useObservable(
  from(
    liveQuery(() => {
      return db.tasks.filter((task) => {
        return task.star;
      }).toArray();
    })
  )
);
</script>

<template>
  <div class="star-tab tab-content" :theme="tab ? tab.theme : 'light-pink'">
    <TabContentTitle class="tab-content-title" title="重要" />

    <StarMenu />

    <TaskList v-if="tasks?.length" 
        :tasks="tasks" 
        :sort-key="tab?.sortKey" 
        :sort-reverse="tab?.sortReverse" 
        :show-done="tab?.showDone"
        :group-key="tab?.groupKey" 
        :show-empty="tab?.theme.startsWith('dark') || tab?.theme.startsWith('light')" />

    <div class="no-result" v-else>
      <IconStarTabHint />
      <div class="tips" style="font-weight: bold; margin-top: 30px; line-height: 20px;">
        尝试为一些任务加星标，以便在此处查看它们。
      </div>
    </div>

    <AddNewTask class="add-new-task" :star="true" />
  </div>
</template>
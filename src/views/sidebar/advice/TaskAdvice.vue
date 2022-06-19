<script setup lang="ts">
import { db } from '@/stores/db';
import { from, useObservable } from '@vueuse/rxjs';
import { liveQuery } from 'dexie';
import TaskAdviceItem from './TaskAdviceItem.vue';

const mostRecentTasks = useObservable(
  from(
    liveQuery(() => {
      return db.tasks.filter((task) => {
        return !task.done;
      }).reverse().limit(5).sortBy('createTime');
    })
  )
)
</script>

<template>
  <div class="task-advice">
    <div class="group-title">最近添加</div>

    <template v-if="mostRecentTasks?.length">
      <TaskAdviceItem v-for="task in mostRecentTasks" :task="task" :key="task.id" />
    </template>
    <div v-else style="font-size: 14px; margin-top: 20px; color: #3A3C40;">
      所有任务都完成了。
    </div>
  </div>
</template>

<style>
.task-advice .group-title {
  font-weight: 500;
  margin-bottom: 10px;
  font-size: 14px;
  color: #34373c;
}

.advice-list-enter-active,
.advice-list-leave-active {
  transition: all 0.5s ease;
}

.advice-list-enter-from,
.advice-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
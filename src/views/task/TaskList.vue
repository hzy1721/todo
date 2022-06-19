<script setup lang="ts">
import type { Task } from '@/models/Task';
import { computed } from 'vue';
import TaskListItem from './TaskListItem.vue';
import SortTagGroup from './SortTagGroup.vue';

const props = defineProps({
  tasks: {
    type: Array,
    default: []
  },
  sortKey: {
    type: String,
    default: ''
  },
  sortReverse: {
    type: Boolean,
    default: false
  },
  showDone: {
    type: Boolean,
    default: true
  },
  groupKey: {
    type: String,
    default: ''
  },
  showEmpty: {
    type: Boolean,
    default: false
  }
});

const sortedTasks = computed(() => {
  if (!props.sortKey) {
    return props.tasks;
  }
  const res = (props.tasks as Task[]).sort((first: Task, second: Task) => {
    let ret = 0;
    if (props.sortKey == 'star') {
      if (first.star == second.star) {
        ret = 0;
      } else if (first.star) {
        ret = -1;
      } else {
        ret = 1;
      }
    } else if (props.sortKey == 'name') {
      if (first.name < second.name) {
        ret = -1;
      } else if (first.name == second.name) {
        ret = 0;
      } else {
        ret = 1;
      }
    } else if (props.sortKey == 'dueTime') {
      if (first.dueTime == second.dueTime) {
        ret = 0;
      } else if ((first.dueTime && !second.dueTime)
        || (first.dueTime && second.dueTime && first.dueTime < second.dueTime)) {
        ret = 1;
      } else {
        ret = -1;
      }
    } else if (props.sortKey == 'createTime') {
      if (first.createTime == second.createTime) {
        ret = 0;
      } else if ((first.createTime && !second.createTime)
        || (first.createTime && second.createTime && first.createTime < second.createTime)) {
        ret = 1;
      } else {
        ret = -1;
      }
    } else if (props.sortKey == 'todayTime') {
      if (first.todayTime == second.todayTime) {
        ret = 0;
      } else if ((first.todayTime && !second.todayTime)
        || (first.todayTime && second.todayTime && first.todayTime < second.todayTime)) {
        ret = 1;
      } else {
        ret = -1;
      }
    } else {
      ret = 0;
    }
    if (props.sortReverse) {
      ret = -ret;
    }
    return ret;
  });
  return res;
});

const undoneTasks = computed(() => {
  return sortedTasks.value.filter((task, index, arr) => {
    return !(task as Task).done;
  });
});

const doneTasks = computed(() => {
  return sortedTasks.value.filter((task, index, arr) => {
    return (task as Task).done;
  });
});
</script>

<template>
  <div class="task-list" id="task-list">
    <SortTagGroup :sort-key="sortKey" :sort-reverse="sortReverse" />

    <TaskListItem v-for="task in undoneTasks" :task="(task as Task)" />

    <div v-if="showDone && doneTasks.length">
      <div class="sort-tag">
        <div class="title">已完成</div>
      </div>
      <TaskListItem v-for="task in doneTasks" :task="(task as Task)" />
    </div>

    <div v-if="showEmpty" class="empty-item-group" id="empty-items">
      <div v-for="n in Math.max(10 - tasks.length, 0)" class="empty-item"></div>
    </div>
  </div>
</template>

<style lang="scss">
.task-list {
  
  height: 500px;
  overflow: auto;
  padding-right: 20px;
  margin-right: -20px;

  .empty-item {
    height: 44px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    margin-bottom: 1px;
  }
}
</style>

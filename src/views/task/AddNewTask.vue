<script setup lang="ts">
import { ref } from 'vue';
import { db } from '@/stores/db';
import { Task } from '@/models/Task';

const props = defineProps({
  today: {
    type: Boolean,
    default: false,
  },
  star: {
    type: Boolean,
    default: false
  },
  dueTime: {
    type: Date,
    default: null
  },
  list: {
    type: String,
    default: ''
  }
});

const newTaskName = ref('');

async function addNewTask() {
  if (!newTaskName.value.length) {
    return;
  }
  try {
    const newTask = new Task(newTaskName.value);
    newTask.star = props.star;
    if (props.today) {
      newTask.todayTime = new Date();
    }
    newTask.dueTime = props.dueTime;
    newTask.list = props.list;
    const id = await db.tasks.add(newTask);
    // console.log(`New task added: { id: ${id} }`);
    newTaskName.value = '';
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <div class="add-new-task">
    <div style="display: inline-block; vertical-align: middle; margin-left: 7.5px; line-height: 1;">
      <svg t="1653658589840" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="2158" width="25" height="25" v-if="!newTaskName">
        <path
          d="M866.5 476H548V165.5c0-19.9-16.1-36-36-36s-36 16.1-36 36V476H164.5c-19.9 0-36 16.1-36 36s16.1 36 36 36H476v311.5c0 19.9 16.1 36 36 36s36-16.1 36-36V548h318.5c19.9 0 36-16.1 36-36s-16.1-36-36-36z"
          p-id="2159" fill="#ffffff"></path>
      </svg>
      <svg t="1653882674368" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="3202" width="25" height="25" v-else>
        <path
          d="M512 1000.727273a488.727273 488.727273 0 1 1 488.727273-488.727273 488.727273 488.727273 0 0 1-488.727273 488.727273z m0-919.272728a430.545455 430.545455 0 1 0 430.545455 430.545455A430.545455 430.545455 0 0 0 512 81.454545z"
          fill="#ffffff" p-id="3203"></path>
      </svg>
    </div>

    <div class="task-input-box">
      <input type="text" placeholder="添加任务" class="task-input" v-model="newTaskName" @keydown.enter="addNewTask" />
    </div>
  </div>
</template>

<style>
.add-new-task {
  position: absolute;
  bottom: 20px;
  width: calc(100% - 40px);
  background-color: #1a2022;
  border-radius: 5px;
  height: 45px;
}

.add-new-task .task-input-box {
  display: inline-block; 
  vertical-align: middle; 
  margin-left: 10px; 
  height: 45px; 
  width: calc(100% - 60px);
}

.add-new-task .task-input {
  background-color: transparent;
  color: white;
  width: 100%;
  height: 45px;
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
  line-height: 45px;
}

.add-new-task .task-input::placeholder {
  color: white;
}
</style>
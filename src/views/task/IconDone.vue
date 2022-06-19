<script setup lang="ts">
import { db } from '@/stores/db';
import type { Task } from '@/models/Task';

const props = defineProps<{
  task: Task
}>();

async function toggleDone() {
  await db.tasks.where('id').equals(props.task.id!).modify({ done: !props.task.done });
}
</script>

<template>
  <div class="icon-done" @click="toggleDone">
    <svg t="1653882674368" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
      p-id="3202" width="25" height="25" v-if="!task.done">
      <path
        d="M512 1000.727273a488.727273 488.727273 0 1 1 488.727273-488.727273 488.727273 488.727273 0 0 1-488.727273 488.727273z m0-919.272728a430.545455 430.545455 0 1 0 430.545455 430.545455A430.545455 430.545455 0 0 0 512 81.454545z"
        fill="#6c6c6e" p-id="3203"></path>
    </svg>
    <svg t="1653882717213" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
      p-id="3475" width="25" height="25" v-else>
      <path
        d="M504.364385 16.445242c-278.216885 0-503.756235 225.53935-503.756235 503.756235s225.53935 503.756235 503.756235 503.756235 503.756235-225.53935 503.756235-503.756235S782.58127 16.445242 504.364385 16.445242zM406.070511 739.739869 231.325844 564.928749l65.52925-65.554422 109.215417 109.257705 305.803166-305.919964 65.52925 65.554422L406.070511 739.739869z"
        p-id="3476" fill="#486AE3" class="selected"></path>
    </svg>
  </div>
</template>

<style>
.icon-done {
  display: inline-block;
  line-height: 0;
}
</style>
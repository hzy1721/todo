<script setup lang="ts">
import type { Task } from '@/models/Task';
import { updateTask } from '@/scripts/utils';
import { ref } from 'vue';
import IconUndone from '../../icon/IconUndone.vue';
import IconDoneFill from "../../icon/IconDoneFill.vue";
import IconStar from "../../icon/IconStar.vue";
import IconStarFill from '../../icon/IconStarFill.vue';

const props = defineProps<{
  task: Task | undefined
}>();

const taskNameElement = ref<HTMLElement | null>(null);
function selectElement(el: HTMLElement) {
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(el);
  selection?.removeAllRanges();
  selection?.addRange(range);
}
function updateTaskName() {
  if (taskNameElement.value?.innerText.length) {
    updateTask({ name: taskNameElement.value?.innerText }, props.task?.id);
  } else {
    taskNameElement.value!.innerText = props.task?.name!;
  }
  selectElement(taskNameElement.value!);
}
</script>

<template>
  <div class="header">
    <div class="icon-wrapper">
      <IconUndone style="fill: #6c6c6e;" v-show="!task?.done" @click="updateTask({ done: true })" />
      <IconDoneFill style="fill: #6D7FC8;" v-show="task?.done" @click="updateTask({ done: false })" />
    </div>
    <div class="task-name" contenteditable="true" @keydown.enter.prevent="updateTaskName" ref="taskNameElement">
      {{ task?.name }}
    </div>
    <div class="icon-wrapper">
      <IconStar style="fill: #6c6c6e;" v-show="!task?.star" @click="updateTask({ star: true })" />
      <IconStarFill style="fill: #6D7FC8;" v-show="task?.star" @click="updateTask({ star: false })" />
    </div>
  </div>
</template>

<style lang="scss">
.task-detail {

  .header {
    width: 100%;
    margin-bottom: 10px;

    .icon-wrapper {
      vertical-align: top;
      width: 20px;
      margin: 0 2.5px;
    }

    .task-name {
      display: inline-block;
      vertical-align: top;
      width: 150px;
      margin: 0 10px;
      outline: none;
      font-weight: bold;
      font-size: 14px;
      line-height: 20px;
    }
  }
}
</style>
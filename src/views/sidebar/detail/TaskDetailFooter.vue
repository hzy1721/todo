<script setup lang="ts">
import { useHomeStore } from '@/stores/home';
import { storeToRefs } from 'pinia';
import { readableTime, deleteTask } from '@/scripts/utils';
import type { Task } from '@/models/Task';
import IconRight from "../../icon/IconRight.vue";
import IconDelete from "../../icon/IconDelete.vue";

const props = defineProps<{
  task: Task | undefined
}>();

const homeStore = useHomeStore();
const { activeSideBar, dialog } = storeToRefs(homeStore);

function deleteTaskHandler() {
  dialog.value.title = `将永久删除“${props.task?.name}”。`
  dialog.value.subtitle = '你将无法撤消此操作。';
  dialog.value.confirmText = '删除任务';
  dialog.value.action = () => {
    deleteTask(props.task?.id); 
    dialog.value.show = false; 
    activeSideBar.value = '';
  }
  dialog.value.show = true;
}
</script>

<template>
  <div class="footer">
    <div class="icon-wrapper" @click="activeSideBar = ''">
      <IconRight style="width: 20px; height: 20px; fill: #767678;" />
    </div>
    <div class="middle-text" style="text-align: center;">
      创建于 {{ readableTime(task ? task.createTime : new Date()) }}
    </div>
    <div class="icon-wrapper" @click="deleteTaskHandler">
      <IconDelete style="width: 20px; height: 20px; fill: #767678;" />
    </div>
  </div>
</template>

<style lang="scss">
.task-detail {

  .footer {
    position: absolute;
    bottom: 0;
    left: 0;
    margin-top: 20px;
  }
}
</style>
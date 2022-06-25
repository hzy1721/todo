<script setup lang="ts">
import { db } from "@/stores/db";
import { useHomeStore } from "@/stores/home";
import { from, useObservable } from "@vueuse/rxjs";
import { liveQuery } from "dexie";
import { storeToRefs } from "pinia";
import { onMounted, ref, computed } from "vue";
import { updateTask } from '@/scripts/utils';

import TaskDetailHeader from "./TaskDetailHeader.vue";
import TaskDetailSteps from "./TaskDetailSteps.vue";
import TaskDetailToday from "./TaskDetailToday.vue";
import TaskDetailDueTime from "./TaskDetailDueTime.vue";
import Divider from "../../components/Divider.vue";
import IconBell from '../../icon/IconBell.vue';
import IconRepeat from '../../icon/IconRepeat.vue';
import IconFile from '../../icon/IconFile.vue';
import TaskDetailFooter from "./TaskDetailFooter.vue";

const homeStore = useHomeStore();
const { activeSideBar } = storeToRefs(homeStore);
const task = computed(() => {
  return useObservable(
    from(
      liveQuery(() => {
        const activeTaskId = Number(activeSideBar.value.slice(5));
        return db.tasks.get(activeTaskId);
      })
    )
  );
});

const taskRemarkElement = ref<HTMLInputElement | null>(null);
onMounted(() => {
  // taskRemarkElement.value!.value = '';
});
function autoGrowHeight(e: Event) {
  const el = e.target as HTMLInputElement;
  el.style.height = '5px';
  el.style.height = (el.scrollHeight - 4) + 'px';
}
function updateTaskRemark(e: Event) {
  const newRemark = (e.target as HTMLInputElement).value;
  if (newRemark !== task.value.value?.remark) {
    updateTask({ remark: newRemark }, task.value.value?.id);
  }
}
</script>

<template>
  <div class="task-detail" id="task-detail">
    <TaskDetailHeader :task="task.value" />

    <div class="content">
      <TaskDetailSteps :task="task.value" />

      <Divider margin="10px 0" />

      <TaskDetailToday :task="task.value" />

      <Divider margin="10px 0" />

      <!-- <div style="margin: 20px 0;">
        <div class="icon-wrapper">
          <IconBell style="width: 20px; height: 20px; fill: #767678;" />
        </div>
        <div class="middle-text" style="color: #767678;">
          提醒我
        </div>
      </div> -->

      <TaskDetailDueTime :task="task.value" />

      <!-- <div style="margin: 20px 0;">
        <div class="icon-wrapper">
          <IconRepeat style="width: 20px; height: 20px; fill: #767678;" />
        </div>
        <div class="middle-text" style="color: #767678;">
          重复
        </div>
      </div> -->

      <Divider margin="10px 0" />

      <!-- <div style="margin: 15px 0;">
        <div class="icon-wrapper">
          <IconFile style="width: 20px; height: 20px; fill: #767678;" />
        </div>
        <div class="middle-text" style="color: #767678;">
          添加文件
        </div>
      </div>

      <Divider margin="10px 0" /> -->

      <div style="margin: 15px 0;">
        <textarea
          style="width: 100%; min-height: 90px; outline: none; resize: none; color: #767678; font-size: 14px; overflow: hidden; line-height: 18px; border: none;"
          placeholder="添加备注" @input="autoGrowHeight" ref="taskRemarkElement"
          @focusout="updateTaskRemark" :key="task.value?.id">{{ task.value?.remark }}</textarea>
      </div>

      <Divider margin="10px 0" />
    </div>

    <TaskDetailFooter :task="task.value" />
  </div>
</template>

<style lang="scss">
.task-detail {
  position: relative;
  height: 100%;

  .content {
    height: 500px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .icon-wrapper {
    display: inline-block;
    width: 25px;
    text-align: center;
    line-height: 0;
    vertical-align: middle;
  }

  .middle-text {
    display: inline-block;
    vertical-align: middle;
    margin: 0 10px;
    width: 150px;
    font-size: 14px;
    color: #767678;

    input {
      outline: none;
      border: none;
      color: #6D7FC8;
    }

    input::placeholder {
      color: #6D7FC8;
    }
  }
}
</style>
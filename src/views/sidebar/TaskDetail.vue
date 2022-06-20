<script setup lang="ts">
import { db } from "@/stores/db";
import { useHomeStore } from "@/stores/home";
import { from, useObservable } from "@vueuse/rxjs";
import { liveQuery } from "dexie";
import { storeToRefs } from "pinia";
import { onMounted, ref, computed } from "vue";
import IconUndone from '../icon/IconUndone.vue';
import IconDoneFill from "../icon/IconDoneFill.vue";
import IconCircle from "../icon/IconCircle.vue";
import IconStar from "../icon/IconStar.vue";
import IconStarFill from '../icon/IconStarFill.vue';
import IconCancel from "../icon/IconCancel.vue";
import IconAdd from "../icon/IconAdd.vue";
import IconSun from "../icon/IconSun.vue";
import Divider from "../components/Divider.vue";
import IconCalendarToday from "../icon/IconCalendarToday.vue";
import IconRight from "../icon/IconRight.vue";
import IconDelete from "../icon/IconDelete.vue";
import IconDoneSmall from '../icon/IconDoneSmall.vue';
import { updateTask, readableTime, timeInToday, deleteTask } from '@/scripts/utils';
import IconBell from '../icon/IconBell.vue';
import IconRepeat from '../icon/IconRepeat.vue';
import IconFile from '../icon/IconFile.vue';

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
    updateTask({ name: taskNameElement.value?.innerText }, task.value.value?.id);
  } else {
    taskNameElement.value!.innerText = task.value.value?.name!;
  }
  selectElement(taskNameElement.value!);
}

const currStep = ref('');
function addStep() {
  const steps = task.value.value?.steps.slice();
  steps?.push({
    name: currStep.value,
    done: false
  });
  updateTask({ 'steps': JSON.parse(JSON.stringify(steps)) });
}
function updateStep(index, obj) {
  const steps = task.value.value?.steps.slice();
  Object.keys(obj).forEach((key) => {
    steps![index][key] = obj[key];
  });
  updateTask({ 'steps': JSON.parse(JSON.stringify(steps)) });
}
function deleteStep(index) {
  const steps = task.value.value?.steps.slice(0, index).concat(task.value.value?.steps.slice(index + 1));
  updateTask({ 'steps': JSON.parse(JSON.stringify(steps)) });
}

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

const { dialog } = storeToRefs(homeStore);
function deleteTaskHandler() {
  dialog.value.title = `将永久删除“${task.value.value?.name}”。`
  dialog.value.subtitle = '你将无法撤消此操作。';
  dialog.value.action = () => { deleteTask(task.value.value?.id); dialog.value.show = false; activeSideBar.value = ''; }
  dialog.value.show = true;
}
</script>

<template>
  <div class="task-detail" id="task-detail">
    <div class="header">
      <div class="icon-wrapper">
        <IconUndone style="fill: #6c6c6e;" v-show="!task.value?.done" @click="updateTask({ done: true })" />
        <IconDoneFill style="fill: #6D7FC8;" v-show="task.value?.done" @click="updateTask({ done: false })" />
      </div>
      <div class="task-name" contenteditable="true" @keydown.enter.prevent="updateTaskName" ref="taskNameElement">
        {{ task.value?.name }}
      </div>
      <div class="icon-wrapper">
        <IconStar style="fill: #6c6c6e;" v-show="!task.value?.star" @click="updateTask({ star: true })" />
        <IconStarFill style="fill: #6D7FC8;" v-show="task.value?.star" @click="updateTask({ star: false })" />
      </div>
    </div>

    <div class="content">
      <div class="steps">
        <div class="step-item" v-for="(step, index) in task.value?.steps" :class="{ done: step.done }">
          <div class="icon-wrapper" @click="updateStep(index, { done: !step.done })">
            <IconCircle style="width: 20px; height: 20px; fill: #6c6c6e;" v-if="!step.done" />
            <IconDoneSmall style="width: 20px; height: 20px; fill: #6D7FC8;" v-else />
          </div>
          <div class="step-name">
            {{ step.name }}
          </div>
          <div class="icon-wrapper" @click="deleteStep(index)">
            <IconCancel style="width: 20px; height: 20px; fill: #6c6c6e;" />
          </div>
        </div>
      </div>

      <div class="add-step">
        <div class="icon-wrapper">
          <IconAdd style="width: 20px; height: 20px; fill: #6D7FC8;" />
        </div>
        <div class="middle-text" style="color: #6D7FC8;">
          <input type="text" v-model="currStep" :placeholder="task.value?.steps.length ? '下一步' : '添加步骤'"
            @keydown.enter.prevent="addStep" />
        </div>
      </div>

      <Divider margin="10px 0" />

      <div style="margin: 15px 0;">
        <template v-if="task.value && !timeInToday(task.value.todayTime)">
          <div class="icon-wrapper">
            <IconSun style="width: 20px; height: 20px; fill: #767678;" />
          </div>
          <div class="middle-text" style="color: #767678;" @click="updateTask({ todayTime: new Date() })">
            添加到“我的一天”
          </div>
        </template>
        <template v-else>
          <div class="icon-wrapper">
            <IconSun style="width: 20px; height: 20px; fill: #6D7FC8;" />
          </div>
          <div class="middle-text" style="color: #6D7FC8;">
            已添加到“我的一天”
          </div>
          <div class="icon-wrapper" @click="updateTask({ todayTime: null })">
            <IconCancel style="width: 20px; height: 20px; fill: #767678;" />
          </div>
        </template>
      </div>

      <!-- <Divider margin="10px 0" /> -->

      <!-- <div style="margin: 20px 0;">
        <div class="icon-wrapper">
          <IconBell style="width: 20px; height: 20px; fill: #767678;" />
        </div>
        <div class="middle-text" style="color: #767678;">
          提醒我
        </div>
      </div> -->

      <!-- <div style="margin: 20px 0;">
        <div class="icon-wrapper">
          <IconCalendarToday style="width: 20px; height: 20px; fill: #767678;" />
        </div>
        <div class="middle-text" style="color: #767678;">
          添加截止日期
        </div>
      </div> -->

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

    <div class="footer">
      <div class="icon-wrapper" @click="activeSideBar = ''">
        <IconRight style="width: 20px; height: 20px; fill: #767678;" />
      </div>
      <div class="middle-text" style="text-align: center;">
        创建于 {{ readableTime(task.value ? task.value.createTime : new Date()) }}
      </div>
      <div class="icon-wrapper" @click="deleteTaskHandler">
        <IconDelete style="width: 20px; height: 20px; fill: #767678;" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.task-detail {
  position: relative;
  height: 100%;

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

  .content {
    height: 500px;
    overflow-y: auto;
    overflow-x: hidden;

    .step-item {
      margin-top: 15px;

      .step-name {
        display: inline-block;
        vertical-align: middle;
        margin: 0 10px;
        width: 150px;
        font-size: 14px;
      }
    }

    .step-item.done {

      .step-name {
        color: #767678;
        text-decoration: line-through;
      }
    }

    .add-step {
      margin: 15px 0;
    }
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

  .footer {
    position: absolute;
    bottom: 0;
    left: 0;
    margin-top: 20px;
  }
}
</style>
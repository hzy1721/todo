<script setup lang="ts">
import type { Task } from '@/models/Task';
import { ref } from 'vue';
import { updateTask } from '@/scripts/utils';
import IconCircle from "../../icon/IconCircle.vue";
import IconDoneSmall from '../../icon/IconDoneSmall.vue';
import IconCancel from "../../icon/IconCancel.vue";
import IconAdd from "../../icon/IconAdd.vue";

const props = defineProps<{
  task: Task | undefined
}>();

const currStep = ref('');
function addStep() {
  const steps = props.task?.steps.slice();
  steps?.push({
    name: currStep.value,
    done: false
  });
  updateTask({ 'steps': JSON.parse(JSON.stringify(steps)) });
  currStep.value = '';
}
function updateStep(index, obj) {
  const steps = props.task?.steps.slice();
  Object.keys(obj).forEach((key) => {
    steps![index][key] = obj[key];
  });
  updateTask({ 'steps': JSON.parse(JSON.stringify(steps)) });
}
function deleteStep(index) {
  const steps = props.task?.steps.slice(0, index).concat(props.task?.steps.slice(index + 1));
  updateTask({ 'steps': JSON.parse(JSON.stringify(steps)) });
}
</script>

<template>
  <div class="step-section">
    <div class="steps">
      <div class="step-item" v-for="(step, index) in task?.steps" :class="{ done: step.done }">
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
        <input type="text" v-model="currStep" :placeholder="task?.steps.length ? '下一步' : '添加步骤'"
          @keydown.enter.prevent="addStep" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.task-detail {

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
</style>
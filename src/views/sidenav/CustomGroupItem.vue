<script setup lang="ts">
import type { TaskListGroup } from '@/models/TaskListGroup';
import { ref } from 'vue';
import IconCustomGroup from '../icon/IconCustomGroup.vue';
import IconArrowRight from '../icon/IconArrowRight.vue';
import CustomListItem from './CustomListItem.vue';
import IconArrowDown from '../icon/IconArrowDown.vue';

const props = defineProps<{
  group: TaskListGroup
}>();

const expanded = ref(false);
</script>

<template>
  <div class="custom-group-item">
    <div class="group-name" @click="expanded = !expanded">
      <div class="icon-wrapper">
        <IconCustomGroup style="fill: #5c70bf;" />
      </div>
      <div class="text-wrapper">
        {{ group.name }}
      </div>
      <div class="icon-wrapper" style="position: absolute; right: 10px; top: 5px;">
        <IconArrowRight style="fill: #5c70bf;" v-show="!expanded" />
        <IconArrowDown style="fill: #5c70bf;" v-show="expanded" />
      </div>
    </div>

    <div v-show="expanded">
      <CustomListItem v-for="list in group.lists" :list="list" style="padding-left: 30px;" />
    </div>
  </div>
</template>

<style>
.custom-group-item {
  position: relative;
}

.custom-group-item > .group-name {
  padding: 5px 10px;
}
</style>
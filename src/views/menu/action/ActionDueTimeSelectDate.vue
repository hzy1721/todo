<script setup lang="ts">
import MenuItemView from './MenuItemView.vue';
import { updateTask } from '@/scripts/utils';
import IconCalendarEmpty from '../../icon/IconCalendarEmpty.vue';

const nowTime = new Date();
const targetTime = new Date(nowTime.getFullYear(), nowTime.getMonth(), nowTime.getDate() + 6, 23, 59, 59);
const dueTime = new Date(targetTime.getFullYear(), targetTime.getMonth(), targetTime.getDate(), 23, 59, 59);
</script>

<template>
  <MenuItemView title="选择日期" :action="() => { updateTask({ dueTime }) }">
    <template #icon>
      <IconCalendarEmpty />
    </template>
  </MenuItemView>
</template>
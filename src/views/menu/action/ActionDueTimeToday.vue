<script setup lang="ts">
import MenuItemView from './MenuItemView.vue';
import { updateTask, dayToChineseWeek } from '@/scripts/utils';
import IconCalendarToday from '../../icon/IconCalendarToday.vue';

const targetTime = new Date();
const dueTime = new Date(targetTime.getFullYear(), targetTime.getMonth(), targetTime.getDate(), 23, 59, 59);
</script>

<template>
  <MenuItemView title="今天" :action="() => { updateTask({ dueTime }) }" :subtitle="dayToChineseWeek(targetTime.getDay())">
    <template #icon>
      <IconCalendarToday />
    </template>
  </MenuItemView>
</template>
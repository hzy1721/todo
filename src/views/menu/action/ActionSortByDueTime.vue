<script setup lang="ts">
import MenuItemView from './MenuItemView.vue';
import IconCalendarToday from '@/views/icon/IconCalendarToday.vue';
import { updateActiveInfo } from '@/scripts/utils';
</script>

<template>
  <MenuItemView title="到期日期" :action="() => { updateActiveInfo({ sortKey: 'dueTime' }); }">
    <template #icon>
      <IconCalendarToday />
    </template>
  </MenuItemView>
</template>
<script setup lang="ts">
import MenuItemView from './MenuItemView.vue';
import IconCalendarToday from '@/views/icon/IconCalendarToday.vue';
</script>

<template>
  <MenuItemView title="到期日期" :action="() => {}">
    <template #icon>
      <IconCalendarToday />
    </template>
  </MenuItemView>
</template>
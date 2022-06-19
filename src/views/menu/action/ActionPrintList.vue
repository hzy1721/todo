<script setup lang="ts">
import MenuItemView from './MenuItemView.vue';
import IconPrint from '@/views/icon/IconPrint.vue';
</script>

<template>
  <MenuItemView title="打印此列表" :action="() => {}">
    <template #icon>
      <IconPrint />
    </template>
  </MenuItemView>
</template>
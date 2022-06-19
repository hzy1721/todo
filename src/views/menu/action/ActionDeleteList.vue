<script setup lang="ts">
import MenuItemView from './MenuItemView.vue';
import IconDelete from '@/views/icon/IconDelete.vue';
</script>

<template>
  <MenuItemView title="删除列表" :action="() => {}">
    <template #icon>
      <IconDelete />
    </template>
  </MenuItemView>
</template>
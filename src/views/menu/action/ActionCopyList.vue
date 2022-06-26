<script setup lang="ts">
import MenuItemView from './MenuItemView.vue';
import IconCopy from '@/views/icon/IconCopy.vue';
</script>

<template>
  <MenuItemView title="复制列表" :action="() => {  }">
    <template #icon>
      <IconCopy />
    </template>
  </MenuItemView>
</template>
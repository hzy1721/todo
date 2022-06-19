<script setup lang="ts">
import MenuItemView from './MenuItemView.vue';
import IconSort from '@/views/icon/IconSort.vue';
</script>

<template>
  <MenuItemView title="排序" :action="() => {}">
    <template #icon>
      <IconSort />
    </template>
    <template #subMenu>
      <slot></slot>
    </template>
  </MenuItemView>
</template>
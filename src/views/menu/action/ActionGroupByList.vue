<script setup lang="ts">
import MenuItemView from './MenuItemView.vue';
import IconList from '@/views/icon/IconList.vue';
</script>

<template>
  <MenuItemView title="列表" :action="() => {}">
    <template #icon>
      <IconList />
    </template>
  </MenuItemView>
</template>
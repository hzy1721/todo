<script setup lang="ts">
import MenuItemView from './MenuItemView.vue';
import IconRename from '@/views/icon/IconRename.vue';
</script>

<template>
  <MenuItemView title="重命名列表" :action="() => {}">
    <template #icon>
      <IconRename />
    </template>
  </MenuItemView>
</template>
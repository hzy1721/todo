<script setup lang="ts">
import MenuItemView from './MenuItemView.vue';
import IconRename from '@/views/icon/IconRename.vue';

function focusTitle() {
  const el = document.getElementById('custom-list-title-content');
  el?.focus();
}
</script>

<template>
  <MenuItemView title="重命名列表" :action="() => { focusTitle(); }">
    <template #icon>
      <IconRename />
    </template>
  </MenuItemView>
</template>
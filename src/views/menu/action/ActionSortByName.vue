<script setup lang="ts">
import MenuItemView from './MenuItemView.vue';
import IconAlpha from '@/views/icon/IconAlpha.vue';
import { updateActiveInfo } from '@/scripts/utils';
</script>

<template>
  <MenuItemView title="字母顺序" :action="() => { updateActiveInfo({ sortKey: 'name' }); }">
    <template #icon>
      <IconAlpha />
    </template>
  </MenuItemView>
</template>
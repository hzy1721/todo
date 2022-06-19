<script setup lang="ts">
import MenuItemView from './MenuItemView.vue';
import IconStar from '@/views/icon/IconStar.vue';
import { updateActiveInfo } from '@/scripts/utils';
</script>

<template>
  <MenuItemView title="重要性" :action="() => { updateActiveInfo({ sortKey: 'star' }); }">
    <template #icon>
      <IconStar />
    </template>
  </MenuItemView>
</template>
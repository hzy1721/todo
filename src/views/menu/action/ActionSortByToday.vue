<script setup lang="ts">
import MenuItemView from './MenuItemView.vue';
import IconSun from '@/views/icon/IconSun.vue';
import { updateActiveInfo } from '@/scripts/utils';
</script>

<template>
  <MenuItemView title="已添加到“我的一天”" :action="() => { updateActiveInfo({ sortKey: 'todayTime' }); }">
    <template #icon>
      <IconSun />
    </template>
  </MenuItemView>
</template>
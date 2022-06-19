<script setup lang="ts">
import MenuItemView from './MenuItemView.vue';
import IconAddDate from '@/views/icon/IconAddDate.vue';
import { updateActiveInfo } from '@/scripts/utils';
</script>

<template>
  <MenuItemView title="创建日期" :action="() => { updateActiveInfo({sortKey: 'createTime'}); }">
    <template #icon>
      <IconAddDate />
    </template>
  </MenuItemView>
</template>
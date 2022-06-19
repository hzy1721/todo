<script setup lang="ts">
import MenuItemView from './MenuItemView.vue';
import IconDone from '@/views/icon/IconDone.vue';
import { getActiveInfo, updateActiveInfo } from '@/scripts/utils';

const activeInfo = getActiveInfo();
</script>

<template>
  <MenuItemView v-if="activeInfo?.showDone" title="隐藏已完成任务" :action="() => { updateActiveInfo({ showDone: false }) }">
    <template #icon>
      <IconDone />
    </template>
  </MenuItemView>
  <MenuItemView v-else title="显示完成的任务" :action="() => { updateActiveInfo({ showDone: true }) }">
    <template #icon>
      <IconDone />
    </template>
  </MenuItemView>
</template>
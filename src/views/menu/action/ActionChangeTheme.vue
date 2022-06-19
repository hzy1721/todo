<script setup lang="ts">
import MenuItemView from './MenuItemView.vue';
import IconTheme from '@/views/icon/IconTheme.vue';
import { useHomeStore } from '@/stores/home';

const homeStore = useHomeStore();
</script>

<template>
  <MenuItemView title="更改主题..." :action="() => { homeStore.showSelectTheme = true; }">
    <template #icon>
      <IconTheme />
    </template>
  </MenuItemView>
</template>
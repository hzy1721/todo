<script setup lang="ts">
import MenuItemView from './MenuItemView.vue';
import IconGrouping from '@/views/icon/IconGrouping.vue';
import ActionGroupByList from './ActionGroupByList.vue';
import ActionGroupByDueTime from './ActionGroupByDueTime.vue';
</script>

<template>
  <MenuItemView title="分组依据" :action="() => {}">
    <template #icon>
      <IconGrouping />
    </template>
    <template #subMenu>
      <ActionGroupByList />
      <ActionGroupByDueTime />
    </template>
  </MenuItemView>
</template>
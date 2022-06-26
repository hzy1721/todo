<script setup lang="ts">
import MenuItemView from './MenuItemView.vue';
import IconDelete from '@/views/icon/IconDelete.vue';
import { useHomeStore } from '@/stores/home';
import { storeToRefs } from 'pinia';
import { deleteCustomList } from '@/scripts/utils';

const homeStore = useHomeStore();
const { activeNav, dialog } = storeToRefs(homeStore);
function deleteList() {
  dialog.value.title = `将永久删除“${activeNav.value.slice(5)}”。`
  dialog.value.subtitle = '你将无法撤消此操作。';
  dialog.value.confirmText = '删除列表';
  dialog.value.action = () => {
    deleteCustomList(); 
    dialog.value.show = false; 
    activeNav.value = 'tab_today';
  }
  dialog.value.show = true;
}
</script>

<template>
  <MenuItemView title="删除列表" :action="() => { deleteList(); }">
    <template #icon>
      <IconDelete />
    </template>
  </MenuItemView>
</template>
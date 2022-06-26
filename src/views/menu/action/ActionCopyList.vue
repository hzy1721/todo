<script setup lang="ts">
import MenuItemView from './MenuItemView.vue';
import IconCopy from '@/views/icon/IconCopy.vue';
import { useHomeStore } from '@/stores/home';
import { storeToRefs } from 'pinia';
import { getCustomListName } from '@/scripts/utils'; 
import { TaskList } from '@/models/TaskList';
import { db } from '@/stores/db';

const homeStore = useHomeStore();
const { activeNav, customLists } = storeToRefs(homeStore);
async function copyList() {
  const originName = activeNav.value.startsWith('list_') ? activeNav.value.slice(5) : '';
  const name = getCustomListName(originName);
  customLists.value.push(name);
  localStorage.setItem('custom_lists', JSON.stringify(customLists.value));
  const newList = new TaskList(name);
  const id = await db.lists.add(newList);
  const tasks = await db.tasks.where('list').equals(originName).toArray();
  for (const task of tasks) {
    task.id = undefined;
    task.list = name;
    await db.tasks.add(task);
  }
}
</script>

<template>
  <MenuItemView title="复制列表" :action="copyList">
    <template #icon>
      <IconCopy />
    </template>
  </MenuItemView>
</template>
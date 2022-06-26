<script setup lang="ts">
import CustomListItem from "./CustomListItem.vue";
import CustomGroupItem from "./CustomGroupItem.vue";
import IconAdd from '../icon/IconAdd.vue';
import IconAddGroup from '../icon/IconAddGroup.vue';
import { useHomeStore } from "@/stores/home";
import { storeToRefs } from "pinia";
import { getCustomListName } from "@/scripts/utils";
import { TaskList } from "@/models/TaskList";
import { db } from "@/stores/db";

if (!localStorage.getItem('custom_lists')) {
  localStorage.setItem('custom_lists', JSON.stringify([]));
}
const homeStore = useHomeStore();
const { activeNav, customLists } = storeToRefs(homeStore);
customLists.value = JSON.parse(localStorage.getItem('custom_lists')!);

async function addNewCustomList() {
  const originName = '无标题列表';
  const name = getCustomListName(originName);
  customLists.value.push(name);
  localStorage.setItem('custom_lists', JSON.stringify(customLists.value));
  const newList = new TaskList(name);
  const id = await db.lists.add(newList);
  activeNav.value = `list_${name}`;
}

function addNewCustomGroup() {
  customLists.value.push({ name: '未命名的组', lists: [] });
}
</script>

<template>
  <div class="custom-list-nav">
    <template v-for="item in customLists">
      <CustomListItem v-if="typeof item == 'string'" :name="item" />
      <CustomGroupItem v-else :group="item" />
    </template>

    <div class="side-nav-footer">
      <div class="icon-wrapper" @click="addNewCustomList">
        <IconAdd style="fill: #5F6063;" />
      </div>
      <div class="text-wrapper" style="color: #5F6063;" @click="addNewCustomList">
        新建列表
      </div>
      <!-- <div class="icon-wrapper" style="position: absolute; right: 0; width: 30px;" @click="addNewCustomGroup">
        <IconAddGroup style="fill: #5F6063;" />
      </div> -->
    </div>
  </div>
</template>

<style>
.side-nav-footer {
  margin: 10px;
  position: absolute;
  bottom: 5px;
  width: 200px;
}
</style>
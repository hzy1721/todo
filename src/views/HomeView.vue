<script setup lang="ts">
import { useHomeStore } from '@/stores/home';
import { storeToRefs } from 'pinia';

import SideNav from './sidenav/SideNav.vue';

import SearchResultTab from './tab/search/SearchResultTab.vue';
import TodayTab from './tab/today/TodayTab.vue';
import StarTab from './tab/star/StarTab.vue';
import PlanTab from './tab/plan/PlanTab.vue';
import TaskTabView from './tab/task/TaskTab.vue';
import CustomListTab from './tab/list/CustomListTab.vue';
import SelectTheme from './menu/SelectTheme.vue';

import SideBar from './sidebar/SideBar.vue';

import { db } from '@/stores/db';
import { onBeforeMount, onMounted, onUnmounted } from 'vue';
import { TaskTab } from '@/models/TaskTab';
import Dialog from './components/Dialog.vue';

// set default theme
onBeforeMount(async () => {
  const tabCount = await db.tabs.count();
  if (tabCount === 0) {
    await db.tabs.bulkAdd([
      new TaskTab('today', 'light-blue'),
      new TaskTab('star', 'light-pink'),
      new TaskTab('plan', 'light-green'),
      new TaskTab('task', 'dark-blue'),
    ]);
  } 
});

const homeStore = useHomeStore();
const { activeNav, showSelectTheme, searchText, activeSideBar, dialog } = storeToRefs(homeStore);

function globalClickHandler(e: Event) {
  // when show dialog ignore global click handler
  if (dialog.value.show) {
    return;
  }
  const target = e.target as Node;
  // select theme panel close
  if (showSelectTheme.value) {
    const menu = document.getElementById('more-menu');
    const panel = document.getElementById('select-theme');
    if (!menu!.contains(target) && panel && !panel.contains(target)) {
      showSelectTheme.value = false;
    }
  }
  // task detail sidebar close
  if (activeSideBar.value.startsWith('task_')) {
    const detail = document.getElementById('task-detail');
    const list = document.getElementById('task-list');
    const empty = document.getElementById('empty-items');
    if (detail && !detail.contains(target) && (list && !list.contains(target) || empty && empty.contains(target))) {
      activeSideBar.value = '';
    }
  }
}
onMounted(() => {
  document.addEventListener('mousedown', globalClickHandler);
});
onUnmounted(() => {
  document.removeEventListener('mousedown', globalClickHandler);
});
</script>

<template>
  <div class="home-view">
    <div class="home-container">
      <SideNav />

      <div class="tab-content-box" :show-side-bar="activeSideBar.length ? 'true' : 'false'">
        <SearchResultTab v-if="searchText" />
        <TodayTab v-else-if="activeNav === 'tab_today'" />
        <StarTab v-else-if="activeNav === 'tab_star'" />
        <PlanTab v-else-if="activeNav === 'tab_plan'" />
        <TaskTabView v-else-if="activeNav === 'tab_task'" />
        <CustomListTab v-else-if="activeNav.startsWith('list_')" />
        
        <SelectTheme v-if="showSelectTheme" />
      </div>
      
      <Transition name="sidebar-slide">
        <SideBar v-if="activeSideBar.length" />
      </Transition>
    </div>

    <Dialog />
  </div>
</template>

<style>
.home-view {
  width: 1000px;
  height: 700px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

.home-container {
  width: 1000px;
  height: 700px;
  /* box-shadow: 1px 1px 5px #999; */
  border-radius: 10px;
  user-select: none;
  position: relative;
  top: -30px;
  display: flex;
}

.home-container .tab-content-box {
  max-width: 780px;
  flex: 1;
  height: 100%;
  display: inline-block;
  vertical-align: top;
  position: relative;
}

.home-container .tab-content-box[show-side-bar="true"] .tab-content {
  border-radius: 0;
  box-shadow: 1px 0 3px #999;
}
/* 
.sidebar-slide-enter-active {
  transition: all 0.1s ease-out;
}

.sidebar-slide-leave-active {
  transition: all 0.1s ease-out;
}

.sidebar-slide-enter-from,
.sidebar-slide-leave-to {
  transform: translateX(30px);
  opacity: 0;
} */
</style>

<script setup lang="ts">
import IconSun from '../icon/IconSun.vue';
import IconStar from '../icon/IconStar.vue';
import IconCalendarEmpty from '../icon/IconCalendarEmpty.vue';
import IconHome from '../icon/IconHome.vue';
import { useHomeStore } from '@/stores/home';
import { storeToRefs } from 'pinia';
import TabNavItem from './TabNavItem.vue';

const homeStore = useHomeStore();
const { activeNav } = storeToRefs(homeStore);

const tabs = [
  { id: 'today', name: '我的一天', defaultTheme: 'light-blue' },
  { id: 'star', name: '重要', defaultTheme: 'light-pink' },
  // { id: 'plan', name: '计划内', defaultTheme: 'light-green' },
  { id: 'task', name: '任务', defaultTheme: 'dark-blue' },
];
</script>

<template>
  <div class="task-tab-nav" style="margin-top: 10px;">

    <TabNavItem v-for="tab in tabs" 
        :class="{ selected: activeNav === `tab_${tab.id}` }" 
        @click="activeNav = `tab_${tab.id}`"
        :id="tab.id"
        :name="tab.name">
      <template #icon>
        <IconSun v-if="tab.id === 'today'" />
        <IconStar v-else-if="tab.id === 'star'" />
        <IconCalendarEmpty v-else-if="tab.id === 'plan'" />
        <IconHome v-else-if="tab.id === 'task'" />
      </template>
    </TabNavItem>

  </div>
</template>
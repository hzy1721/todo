<script setup lang="ts">
import { useHomeStore } from '@/stores/home';
import { storeToRefs } from 'pinia';
import IconBulb from '../icon/IconBulb.vue';

const homeStore = useHomeStore();
const { activeSideBar } = storeToRefs(homeStore);

function toggleAdviceBar() {
  if (activeSideBar.value === '') {
    activeSideBar.value = 'advice';
  } else if (activeSideBar.value === 'advice') {
    activeSideBar.value = '';
  }
}
</script>

<template>
  <div class="menu-button" :selected="activeSideBar === 'advice'" @click="toggleAdviceBar">
    <IconBulb />
  </div>
</template>

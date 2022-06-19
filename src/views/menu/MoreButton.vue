<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import IconMore from "../icon/IconMore.vue";
import MenuView from './MenuView.vue';

const showMenu = ref(false);
function clickOutsideHandler(e: Event) {
  const el = document.getElementsByClassName('more-button')[0];
  if (showMenu.value && !el.contains(e.target as Node)) {
    showMenu.value = false;
  }
}
onMounted(() => {
  document.addEventListener('click', clickOutsideHandler);
});
onUnmounted(() => {
  document.removeEventListener('click', clickOutsideHandler);
});
</script>

<template>
  <div class="more-button">
    <div class="menu-button" @click="showMenu = !showMenu">
      <IconMore style="width: 25px; height: 25px; fill: #fff" />
    </div>
    <MenuView v-show="showMenu" @click="showMenu = false" id="more-menu">
      <slot></slot>
    </MenuView>
  </div>
</template>

<style>
.more-button {
  display: inline-block;
}

.more-button > .menu-list {
  position: absolute;
  top: 40px;
  right: 0;
  z-index: 1;
}
</style>

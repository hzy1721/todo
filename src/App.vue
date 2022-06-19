<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
body {
  overflow: hidden;
}

#app {
  position: fixed;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/bg_catalina.webp');
  background-size: 100% 100%;
}

div[contenteditable="true"] {
  outline: none;
}
</style>

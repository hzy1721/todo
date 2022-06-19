<script setup lang="ts">
const props = defineProps({
  color: {
    type: String,
    default: '#c9c9c9'
  },
  margin: {
    type: String,
    default: '10px'
  }
});
</script>

<template>
  <div class="divider" style="height: 1px;" :style="{ backgroundColor: color, margin: margin }"></div>
</template>
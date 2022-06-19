<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: String
});
</script>

<template>
  <div class="tab-content-title">
    <div class="title">{{ title }}</div>
    <div class="subtitle" v-if="subtitle">{{ subtitle }}</div>
  </div>
</template>

<style>
.tab-content-title {
  color: white;
}

.tab-content-title .title {
  font-size: 32px;
  font-weight: 600;
}

.tab-content-title .subtitle {
  font-size: 13px;
}
</style>
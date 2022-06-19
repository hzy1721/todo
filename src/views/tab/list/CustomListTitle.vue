<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';

const props = defineProps<{
  name: string
}>();

const titleElement: Ref<HTMLElement | null> = ref(null);

onMounted(() => {
  titleElement.value?.focus();
});
</script>

<template>
  <div class="custom-list-title tab-content-title">
    <div class="title" contenteditable="true" ref="title">{{ name }}</div>
  </div>
</template>

<style lang="scss">
.custom-list-title {

  >.title {
    display: inline-block;
  }

  >.title:focus {
    color: black;
    background-color: white;
  }
}
</style>
<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  theme: {
    type: String,
    required: true
  },
  selected: {
    type: Boolean,
    default: false
  }
});

const color = computed(() => {
  switch (props.theme) {
    case 'light-blue':
      return { fill: '#E1EDF8', border: '#3B63A6' };
    case 'light-purple':
      return { fill: '#F1E7F8', border: '#775590' };
    case 'light-pink':
      return { fill: '#FBE5E9', border: '#9F425D' };
    case 'light-red':
      return { fill: '#F7E8DF', border: '#9C4931' };
    case 'light-green':
      return { fill: '#DBF0E6', border: '#386E50' };
    case 'light-cyan':
      return { fill: '#DAF0EF', border: '#346D6A' };
    case 'light-grey':
      return { fill: '#E8EBEF', border: '#5A656F' };
    default:
      return { fill: '#E1EDF8', border: '#3B63A6' };
  }
});
</script>

<template>
  <div class="theme-item light-theme-item" :selected="selected">
    <div class="content-box">
      <div class="content" :style="{ backgroundColor: color.fill, borderColor: color.border }">
      </div>
    </div>

    <div v-show="selected" class="selected-dot" :style="{ backgroundColor: color.border }"></div>
  </div>
</template>

<style>
.light-theme-item[selected="true"] .content-box {
  border: 4px solid #7895dd;
  border-radius: 19px;
}

.light-theme-item .content {
  width: 30px;
  height: 30px;
  border-width: 2px;
  border-style: solid;
  box-sizing: border-box;
  border-radius: 15px;
}
</style>
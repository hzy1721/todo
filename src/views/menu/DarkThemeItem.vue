<script setup lang="ts">
import { computed, ref } from 'vue';

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

const fillColor = computed(() => {
  switch (props.theme) {
    case 'dark-blue':
      return '#6D7FC8';
    case 'dark-purple':
      return '#9F6BA6';
    case 'dark-pink':
      return '#CC6A83';
    case 'dark-red':
      return '#C66761';
    case 'dark-green':
      return '#5B9777';
    case 'dark-cyan':
      return '#599794';
    case 'dark-grey':
      return '#85909A';
    default:
      return '#6D7FC8';
  }
});
</script>

<template>
  <div class="theme-item dark-theme-item" :selected="selected">
    <div class="content" :style="{ backgroundColor: fillColor }">
    </div>

    <div v-show="selected" class="selected-dot"></div>
  </div>
</template>

<style>
.theme-item {
  width: 40px;
  height: 40px;
  padding: 5px;
  box-sizing: border-box;
  position: relative;
  display: inline-block;
  margin: 0 5px 0 0;
}

.theme-item[selected="true"] {
  padding: 1px;
}

.theme-item .content {
  width: 30px;
  height: 30px;
  border-radius: 15px;
}

.theme-item[selected="true"] > .content {
  border: 4px solid #7895dd;
  border-radius: 19px;
}

.theme-item .selected-dot {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  top: 15px;
  left: 15px;
  background-color: #fff;
}
</style>
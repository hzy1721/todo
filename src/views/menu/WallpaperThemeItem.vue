<script setup lang="ts">
import { computed, ref } from 'vue';
import blue_desert from '@/assets/wallpaper/blue_desert.webp';
import snow_bh from '@/assets/wallpaper/snow_bh.webp';

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

const bgImage = computed(() => {
  switch (props.theme) {
    case 'blue-desert':
      return `url('${blue_desert}')`;
    case 'snow-bh':
      return `url('${snow_bh}')`;
    default:
      return `url('${blue_desert}')`;
  }
});
</script>

<template>
  <div class="theme-item wallpaper-theme-item" :selected="selected">
    <div class="content" :style="{ backgroundImage: bgImage }">
    </div>

    <div v-show="selected" class="selected-dot" :style="{  }"></div>
  </div>
</template>

<style>
.wallpaper-theme-item .content {
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-size: cover;
}
</style>
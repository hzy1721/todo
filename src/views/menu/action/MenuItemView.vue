<script setup lang="ts">
import IconArrowRight from '@/views/icon/IconArrowRight.vue';
import MenuView from '../MenuView.vue';

const props = defineProps<{
  title: string,
  action: (payload: MouseEvent) => void
}>();
</script>

<template>
  <div class="menu-item" @click="action">
    <div class="icon">
      <slot name="icon"></slot>
    </div>
    <div class="title">{{ title }}</div>
    <template v-if="$slots.subMenu">
      <IconArrowRight class="icon more" />
      <MenuView class="sub-menu">
        <slot name="subMenu"></slot>
      </MenuView>
    </template>
  </div>
</template>
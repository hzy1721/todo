<script setup lang="ts">
import IconArrowRight from '@/views/icon/IconArrowRight.vue';
import MenuView from '../MenuView.vue';

type actionType = (payload: MouseEvent) => void;

// const props = defineProps<{
//   title: string,
//   action: (payload: MouseEvent) => void,
// }>();
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  action: {
    type: Function,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  }
});
</script>

<template>
  <div class="menu-item" @click="(action as actionType)">
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
    <div class="subtitle" v-if="subtitle">
      {{ subtitle }}
    </div>
  </div>
</template>
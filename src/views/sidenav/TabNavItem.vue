<script setup lang="ts">
import { getActiveInfo, getActiveTaskCount } from '@/scripts/utils';

const props = defineProps<{
  id: string,
  name: string
}>();

const tab = getActiveInfo(`tab_${props.id}`);

const count = getActiveTaskCount(`tab_${props.id}`);
</script>

<template>
  <div class="tab-nav-item" :theme="tab?.theme">
    <div class="icon-wrapper">
      <slot name="icon"></slot>
    </div>
    <div class="text-wrapper">{{ name }}</div>
    <div class="task-count" v-show="count! > 0">{{ count }}</div>
  </div>
</template>

<style lang="scss">
.tab-nav-item {
  padding: 5px 10px;
  cursor: pointer;
  position: relative;

  >.task-count {
    position: absolute;
    top: 5px;
    right: 15px;
    line-height: 25px;
    font-size: 14px;
    color: #6C6C6E;
  }
}

.tab-nav-item.selected {
  background-color: #d3d3d3;

  >.task-count {
    color: #3A3C40;
  }
}
</style>
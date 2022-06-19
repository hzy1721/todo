<script setup lang="ts">
import IconArrowDown from '../icon/IconArrowDown.vue';
import IconArrowUp from '../icon/IconArrowUp.vue';
import IconCancel from '../icon/IconCancel.vue';
import { updateActiveInfo } from '@/scripts/utils';

const props = defineProps<{
  sortKey: string,
  sortReverse: boolean
}>();

const sortNameMap = {
  star: '重要性',
  name: '字母顺序',
  dueTime: '截止日期',
  createTime: '创建日期',
  todayTime: '是否添加到“我的一天”'
};
</script>

<template>
  <div class="sort-tag-group" v-if="sortKey">
    <div class="sort-tag" @click="updateActiveInfo({ sortReverse: !sortReverse })">
      <div class="title">{{ `按${sortNameMap[sortKey]}排序` }}</div>
      <IconArrowDown v-show="!sortReverse" />
      <IconArrowUp v-show="sortReverse" />
    </div>

    <div class="sort-tag" @click="updateActiveInfo({ sortKey: '', sortReverse: false })">
      <IconCancel />
    </div>
  </div>
</template>

<style lang="scss">
.sort-tag {
  height: 20px;
  background-color: #1C211F;
  color: white;
  display: inline-block;
  padding: 1px 5px;
  border-radius: 3px;
  margin: 3px 3px 3px 0;

  .title {
    display: inline-block;
    vertical-align: top;
    line-height: 20px;
    font-size: 13px;
    margin-right: 2.5px;
  }

  svg {
    width: 15px;
    height: 15px;
    margin: 2.5px 0;
    fill: white;
  }
}
</style>
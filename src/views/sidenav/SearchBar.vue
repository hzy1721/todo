<script setup lang="ts">
import { useHomeStore } from '@/stores/home';
import { storeToRefs } from 'pinia';
import IconSearch from '../icon/IconSearch.vue';
import IconCancelFill from '../icon/IconCancelFill.vue';

const homeStore = useHomeStore();
const { searchText } = storeToRefs(homeStore);
</script>

<template>
  <div class="search-bar">
    <div class="icon-wrapper search-icon">
      <IconSearch />
    </div>
    <div class="search-input-box">
      <input class="search-input" type="text" placeholder="搜索" v-model="searchText" />
    </div>
    <div class="icon-wrapper" style="position: absolute; right: 6.5px; top: 8.5px;" v-if="searchText" @click="searchText = ''">
      <IconCancelFill style="width: 20px; height: 20px; fill: #202020;" />
    </div>
  </div>
</template>

<style lang="scss">
.search-bar {
  margin: 5px 10px;
  position: relative;

  >.search-icon {
    position: absolute;
    left: 4px;
    top: 6px;
  }

  >.search-input-box {
    // box-sizing: border-box;
    width: 100%;
    height: 40px;
    text-align: center;

    >.search-input {
      width: calc(100% - 68px);
      height: 30px;
      padding: 0 25px 0 35px;
      border-radius: 10px;
      outline: none;
      border: none;
      background-color: #babec1;
      margin-top: 4px;
    }

    >.search-input::placeholder {
      color: black;
    }

    >.search-input:focus {
      border: 4px solid #7993e0;
      margin: 0;
      border-radius: 14px;
    }
  }
}
</style>
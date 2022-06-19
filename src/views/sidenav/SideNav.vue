<script setup lang="ts">
import SearchBar from './SearchBar.vue';
import Divider from '../components/Divider.vue';
import CustomListNav from './CustomListNav.vue';
import TaskTabNav from './TaskTabNav.vue';
</script>

<template>
  <div class="side-nav">
    <SearchBar />

    <TaskTabNav />
    
    <Divider />

    <!-- <CustomListNav /> -->
  </div>
</template>

<style>
.side-nav {
  width: 220px;
  height: 100%;
  padding: 10px 0 10px 0;
  box-sizing: border-box;
  background-color: #e8e8e8;
  display: inline-block;
  border-radius: 10px 0 0 10px;
  position: relative;
}

.side-nav .icon-wrapper {
  display: inline-block;
  vertical-align: middle;
  line-height: 0;
  margin-left: 5px;
}

.side-nav .icon-wrapper svg {
  width: 25px;
  height: 25px;
}

.side-nav .text-wrapper {
  display: inline-block;
  vertical-align: middle;
  margin-left: 10px;
  font-size: 18px;
}
</style>

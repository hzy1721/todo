<script setup lang="ts">
import DarkThemeItem from "./DarkThemeItem.vue";
import LightThemeItem from "./LightThemeItem.vue";
import WallpaperThemeItem from "./WallpaperThemeItem.vue";
import { getActiveInfo, updateActiveInfo } from "@/scripts/utils";

const darkThemes = ['dark-blue', 'dark-purple', 'dark-pink', 'dark-red', 'dark-green', 'dark-cyan', 'dark-grey'];
const lightThemes = ['light-blue', 'light-purple', 'light-pink', 'light-red', 'light-green', 'light-cyan', 'light-grey'];
const wallpaperThemes = ['blue-desert', 'snow-bh'];

const activeInfo = getActiveInfo();
</script>

<template>
  <div class="select-theme" id="select-theme">
    <div class="title">选择主题</div>

    <DarkThemeItem v-for="darkTheme in darkThemes" 
        :theme="darkTheme" 
        :selected="activeInfo?.theme === darkTheme"
        @click="updateActiveInfo({ theme: darkTheme })" />

    <LightThemeItem v-for="lightTheme in lightThemes" 
        :theme="lightTheme" 
        :selected="activeInfo?.theme === lightTheme"
        @click="updateActiveInfo({ theme: lightTheme })" />

    <WallpaperThemeItem v-for="wallpaperTheme in wallpaperThemes" 
        :theme="wallpaperTheme"
        :selected="activeInfo?.theme === wallpaperTheme" 
        @click="updateActiveInfo({ theme: wallpaperTheme })" />
  </div>
</template>

<style>
.select-theme {
  background-color: rgba(255, 255, 255, 1);
  padding: 10px;
  border-radius: 10px;
  width: 315px;
  padding-right: 5px;
}

.select-theme .title {
  color: #4a5056;
  font-size: 16px;
  margin-bottom: 5px;
  margin-left: 5px;
}
</style>
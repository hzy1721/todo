<script setup lang="ts">
import { useHomeStore } from '@/stores/home';
import { storeToRefs } from 'pinia';

const homeStore = useHomeStore();
const { dialog } = storeToRefs(homeStore);
</script>

<template>
  <div class="dialog-mask" v-show="dialog.show">
    <div class="dialog-content">
      <img src="@/assets/ms_todo_logo.png" />
      <div class="title">{{ dialog.title }}</div>
      <div class="subtitle">{{ dialog.subtitle }}</div>
      <div class="button-group">
        <div class="button" @click="dialog.show = false">取消</div>
        <div class="button" style="background-color: #3575fd; color: white;" @click="dialog.action">删除任务</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.dialog-mask {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);

  >.dialog-content {
    width: 250px;
    height: 200px;
    position: absolute;
    top: calc(50% - 200px);
    left: calc(50% - 125px);
    border-radius: 10px;
    background-color: #DCDCDC;
    box-shadow: 0 0 5px gray;
    text-align: center;

    img {
      width: 70px;
      margin-top: 10px;
      line-height: 0;
    }

    >.title {
      font-size: 15px;
      font-weight: 500;
      color: #202020;
      margin-top: 15px;
    }

    >.subtitle {
      font-size: 12px;
      color: #3B3B3B;
      margin-top: 10px;
      line-height: 15px;
    }

    >.button-group {
      padding: 15px;
      height: 28px;
      margin-right: -10px;
      font-size: 13px;
      
      >.button {
        display: inline-block;
        width: calc(50% - 10px);
        height: 28px;
        line-height: 28px;
        border-radius: 5px;
        background-color: #BEBEBE;
        margin-right: 10px;
        user-select: none;
      }
    }
  }
}
</style>
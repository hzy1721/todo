<script setup lang="ts">
import { ref } from "vue";
import IconCalendarToday from "../../icon/IconCalendarToday.vue";
import MenuView from "../../menu/MenuView.vue";
import ActionDueTimeToday from "../../menu/action/ActionDueTimeToday.vue";
import ActionDueTimeTomorrow from "../../menu/action/ActionDueTimeTomorrow.vue";
import ActionDueTimeNextWeek from "../../menu/action/ActionDueTimeNextWeek.vue";
import Divider from "../../components/Divider.vue";
import ActionDueTimeSelectDate from "../../menu/action/ActionDueTimeSelectDate.vue";
import type { Task } from "@/models/Task";
import { dueTime } from "@/scripts/utils";

const props = defineProps<{
  task: Task | undefined;
}>();

const showMenu = ref(false);
const showSelectDate = ref(false);
</script>

<template>
  <div class="due-time">
    <div class="icon-wrapper">
      <IconCalendarToday
        style="width: 20px; height: 20px"
        :style="{ fill: task?.dueTime ? '#6D7FC8' : '#767678' }"
      />
    </div>
    <div
      v-if="task?.dueTime"
      class="middle-text"
      style="color: #6d7fc8"
      @click="showMenu = true"
    >
      {{ dueTime(task.dueTime) + " 到期" }}
    </div>
    <div
      v-else
      class="middle-text"
      style="color: #767678"
      id="add-due-time"
      @click="showMenu = true"
    >
      添加截止日期
    </div>
    <MenuView v-if="showMenu" class="menu" @click="showMenu = false">
      <ActionDueTimeToday />
      <ActionDueTimeTomorrow />
      <ActionDueTimeNextWeek />
      <!-- <Divider margin="5px 10px" /> -->
      <!-- <ActionDueTimeSelectDate @click="showSelectDate = true" /> -->
    </MenuView>
  </div>
</template>

<style lang="scss">
.task-detail {
  .due-time {
    margin: 15px 0;
    position: relative;

    > .menu {
      position: absolute;
      top: -10px;
      left: 5px;
    }
  }
}
</style>

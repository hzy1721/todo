<script setup lang="ts">
import TaskList from "../../task/TaskList.vue";
import { useHomeStore } from "@/stores/home";
import { storeToRefs } from "pinia";
import { db } from "@/stores/db";
import { from, useObservable } from "@vueuse/rxjs";
import { liveQuery } from "dexie";
import IconSearchTabHint from "../../icon/IconSearchTabHint.vue";
import { computed } from "vue";

const homeStore = useHomeStore();
const { searchText } = storeToRefs(homeStore);

let tasks = computed(() => {
  return useObservable(
    from(
      liveQuery(() => {
        const text = searchText.value;
        return db.tasks.filter((task) => {
          return task.name.search(text) != -1
            || task.remark.search(text) != -1;
        }).toArray();
      })
    )
  );
});
</script>

<template>
  <div class="search-result-tab tab-content" theme="dark-grey">
    <TaskList v-if="tasks.value?.length" :tasks="tasks.value" />

    <div class="no-result" v-else>
      <IconSearchTabHint />
      <div style="color: white; font-weight: bold; margin-top: 30px; line-height: 20px;">已进行深度搜索，但找不到你当前查找的内容。</div>
    </div>
  </div>
</template>

<style lang="scss">
.search-result-tab {

  >.task-list {
    height: 100%;
  }

  .no-result {
    text-align: center;
    margin-top: 150px;
  }
}
</style>
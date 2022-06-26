<script setup lang="ts">
import MoreButton from '../../menu/MoreButton.vue';
import ActionSort from '../../menu/action/ActionSort.vue';
import ActionSortByName from '../../menu/action/ActionSortByName.vue';
import ActionSortByDueTime from '../../menu/action/ActionSortByDueTime.vue';
import ActionSortByCreateTime from '../../menu/action/ActionSortByCreateTime.vue';
import ActionSortByToday from '../../menu/action/ActionSortByToday.vue';
import ActionChangeTheme from '../../menu/action/ActionChangeTheme.vue';
import ActionPrintList from '../../menu/action/ActionPrintList.vue';
import ActionToggleDoneTask from '../../menu/action/ActionToggleDoneTask.vue';
</script>

<template>
  <div class="menu-button-group">
    <MoreButton>
      <ActionSort>
        <ActionSortByName />
        <ActionSortByDueTime />
        <ActionSortByCreateTime />
        <ActionSortByToday />
      </ActionSort>
      <ActionChangeTheme />
      <!-- <ActionPrintList /> -->
      <ActionToggleDoneTask />
    </MoreButton>
  </div>
</template>
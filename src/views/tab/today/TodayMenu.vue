<script setup lang="ts">
import AdviceButton from '../../menu/AdviceButton.vue';
import MoreButton from '../../menu/MoreButton.vue';
import ActionSort from '../../menu/action/ActionSort.vue';
import ActionSortByStar from '../../menu/action/ActionSortByStar.vue';
import ActionSortByName from '../../menu/action/ActionSortByName.vue';
import ActionSortByDueTime from '../../menu/action/ActionSortByDueTime.vue';
import ActionSortByCreateTime from '../../menu/action/ActionSortByCreateTime.vue';
import ActionChangeTheme from '../../menu/action/ActionChangeTheme.vue';
import ActionPrintList from '../../menu/action/ActionPrintList.vue';
import ActionToggleDoneTask from '../../menu/action/ActionToggleDoneTask.vue';
</script>

<template>
  <div class="menu-button-group">
    <AdviceButton />
    <MoreButton>
      <ActionSort>
        <ActionSortByStar />
        <ActionSortByName />
        <ActionSortByDueTime />
        <ActionSortByCreateTime />
      </ActionSort>
      <ActionChangeTheme />
      <!-- <ActionPrintList /> -->
      <ActionToggleDoneTask />
    </MoreButton>
  </div>
</template>
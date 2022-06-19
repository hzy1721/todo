<script setup lang="ts">
import MoreButton from '../../menu/MoreButton.vue';
import ActionRenameList from '../../menu/action/ActionRenameList.vue';
import ActionSort from '../../menu/action/ActionSort.vue';
import ActionSortByStar from '../../menu/action/ActionSortByStar.vue';
import ActionSortByName from '../../menu/action/ActionSortByName.vue';
import ActionSortByDueTime from '../../menu/action/ActionSortByDueTime.vue';
import ActionSortByCreateTime from '../../menu/action/ActionSortByCreateTime.vue';
import ActionSortByToday from '../../menu/action/ActionSortByToday.vue';
import ActionChangeTheme from '../../menu/action/ActionChangeTheme.vue';
import ActionCopyList from '../../menu/action/ActionCopyList.vue';
import ActionPrintList from '../../menu/action/ActionPrintList.vue';
import ActionToggleDoneTask from '../../menu/action/ActionToggleDoneTask.vue';
import Divider from '../../components/Divider.vue';
import ActionDeleteList from '../../menu/action/ActionDeleteList.vue';
</script>

<template>
  <div class="menu-button-group">
    <MoreButton>
      <ActionRenameList />
      <ActionSort>
        <ActionSortByStar />
        <ActionSortByName />
        <ActionSortByDueTime />
        <ActionSortByCreateTime />
        <ActionSortByToday />
      </ActionSort>
      <ActionChangeTheme />
      <ActionCopyList />
      <ActionPrintList />
      <ActionToggleDoneTask />
      <Divider color="#c3c4c4" margin="5px" />
      <ActionDeleteList />
    </MoreButton>
  </div>
</template>
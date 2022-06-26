<script setup lang="ts">
import MoreButton from '../../menu/MoreButton.vue';
import ActionChangeTheme from '../../menu/action/ActionChangeTheme.vue';
import ActionPrintList from '../../menu/action/ActionPrintList.vue';
import ActionGrouping from '../../menu/action/ActionGrouping.vue';
import ActionToggleDoneTask from '../../menu/action/ActionToggleDoneTask.vue';
</script>

<template>
  <div class="menu-button-group">
    <MoreButton>
      <ActionChangeTheme />
      <!-- <ActionPrintList /> -->
      <!-- <ActionGrouping /> -->
      <ActionToggleDoneTask />
    </MoreButton>
  </div>
</template>
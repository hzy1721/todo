<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div class="filter-tag">
    {{ text }}
  </div>
</template>

<style>
.filter-tag {
  font-size: 14px;
  font-weight: bold;
  line-height: 16px;
  border-radius: 3px;
  background-color: #fff;
  display: inline-block;
  padding: 2px 8px;
  margin-right: 20px;
}
</style>
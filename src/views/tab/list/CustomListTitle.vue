<script setup lang="ts">
import { ref } from "vue";
import { getCustomListName, updateListName } from "@/scripts/utils";
import { useHomeStore } from "@/stores/home";
import { storeToRefs } from "pinia";

const props = defineProps<{
  name: string;
}>();

const titleElement = ref<HTMLElement | null>(null);
const homeStore = useHomeStore();
const { activeNav } = storeToRefs(homeStore);
function updateCustomListName() {
  const originName = titleElement.value?.innerText;
  if (!originName?.length) {
    titleElement.value!.innerText = props.name;
    return;
  }
  const name = getCustomListName(originName!);
  updateListName(props.name, name);
  activeNav.value = `list_${name}`;
}
// onMounted(() => {
//   titleElement.value?.focus();
// });
</script>

<template>
  <div class="custom-list-title tab-content-title">
    <div
      id="custom-list-title-content"
      class="title"
      contenteditable="true"
      ref="titleElement"
      @keydown.enter.prevent="updateCustomListName"
    >
      {{ name }}
    </div>
  </div>
</template>

<style lang="scss">
.custom-list-title {
  > .title {
    display: inline-block;
  }

  > .title:focus {
    color: black;
    background-color: white;
  }
}
</style>

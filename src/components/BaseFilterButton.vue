<script setup>
import { computed, useSlots } from 'vue';

const props = defineProps(["currentFilter"])

const slots = useSlots();

const filter = computed(() => {
    return slots.default()[0].children;
});

const emit = defineEmits(["changeFilter"])
const changeFilter = () => {
  emit("changeFilter", filter.value)
}
</script>

<template>
  <div
    role="button"
    @click="changeFilter"
    class="hover:text-very-dark-grayish-blue"
    :class="props.currentFilter === filter ? 'text-blue-500 pointer-events-none' : ''"
  >
    <slot></slot>
  </div>
</template>

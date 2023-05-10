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
  <button
    @click.prevent="changeFilter"
    class="rounded-sm font-semibold hover:text-very-dark-grayish-blue my-focus-visible"
    :class="props.currentFilter === filter ? 'text-blue-500 pointer-events-none' : ''"
  >
    <slot></slot>
  </button>
</template>

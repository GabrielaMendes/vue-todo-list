<script setup>
import { ref, computed } from "vue";
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

const props = defineProps({
  todo: {
    type: Object,
    required: true,
  },
});

const removeVisible = ref(false);
const checkHover = ref(false);
const checked = computed(() => props.todo.completed);

const emit = defineEmits(["toggleCompleted", "removeTodo"]);

const toggleChecked = () => {
  emit("toggleCompleted", props.todo.id);
};

const removeTodo = () => {
  emit("removeTodo", props.todo.id);
};

const breakpoints = useBreakpoints(breakpointsTailwind);
const isDesktop = breakpoints.greater("md");

const applyGradient = () => {
  if (!isDesktop) {
    return checked.value;
  }

  return checkHover.value || checked.value;
};
</script>

<template>
  <li
    class="flex items-start p-reactive my-border-style first:border-none"
    @mouseenter="removeVisible = true"
    @mouseleave="removeVisible = false"
  >
    <label id="chk-label" class="hidden">Mark as completed</label>
    <input
      type="checkbox"
      name="checkbox"
      aria-labelledby="chk-label"
      aria-checked="{{ checked }}"
      @mouseenter="checkHover = true"
      @mouseleave="checkHover = false"
      @focus="checkHover = true"
      @blur="checkHover = false"
      class="appearance-none cursor-pointer h-6 w-6 rounded-full mr-4 bg-gray-200 dark:bg-dark-grayish-blue relative my-focus-visible after:checkbox-inner-bg before:content-[url('src/assets/images/icon-check.svg')] before:absolute before:left-[7px] before:top-[-0.3px]"
      :class="{
        'my-gradient': applyGradient(),
        'after:hidden': checked,
        'before:hidden': !checked,
      }"
      @click.prevent="toggleChecked"
      @keyup.enter="toggleChecked"
    />

    <p
      class="transition-colors duration-150 ease-in"
      :class="
        checked ? 'line-through text-gray-300 dark:text-dark-grayish-blue ' : ''
      "
    >
      {{ props.todo.text }}
    </p>
    <button
      type="button"
      @click.prevent="removeTodo"
      @focus="removeVisible = true"
      @blur="removeVisible = false"
      class="rounded-sm self-center ml-auto my-focus-visible"
    >
      <transition name="fade-200">
        <img
          v-show="removeVisible"
          class="dark:dark-filter"
          src="src/assets/images/icon-cross.svg"
          alt="remove todo"
        />
      </transition>
    </button>
  </li>
</template>

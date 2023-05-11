<script setup>
import { ref, computed } from "vue";
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

const props = defineProps({
  todo: {
    type: Object,
    required: true,
  }
});

const removeVisible = ref(false);
const checkHover = ref(false);
const checked = computed(() => props.todo.completed);

const emit = defineEmits(["toggleCompleted", "removeTodo"]);

const toggleChecked = () => {
  emit('toggleCompleted', props.todo.id);
};

const removeTodo = () => {
  emit('removeTodo', props.todo.id)
}

const breakpoints = useBreakpoints(breakpointsTailwind)
const isDesktop = breakpoints.greater('md')

const applyGradient = () => {
  if (!isDesktop) {
    return checked.value
  }

  return  checkHover.value || checked.value
}

</script>

<template>
  <li
    class="flex items-start p-reactive border-t-[1px] border-gray-200 first:border-none"
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
      class="my-transition appearance-none cursor-pointer h-6 w-6 rounded-full mr-4 bg-gray-200 relative my-focus-visible after:h-[22.5px] after:w-[22.5px] after:bg-white after:rounded-full after:absolute after:left-[0.95px] after:top-[0.95px] before:content-[url('src/assets/images/icon-check.svg')] before:absolute before:left-[7px] before:top-[-1px]"
      :class="{
        'my-gradient': applyGradient(),
        'after:hidden': checked,
        'before:hidden': !checked,
      }"
      @click.prevent="toggleChecked"
      @keyup.enter="toggleChecked"
    />

    <p class="transition-colors duration-150 ease-in" :class="checked ? 'line-through text-gray-300' : ''">{{ props.todo.text }}</p>
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
          src="src/assets/images/icon-cross.svg"
          alt="remove todo"
        />
      </transition>
    </button>
  </li>
</template>

<style>
.my-transition {
  -webkit-transition: background-image 0.3 ease-in;
  transition: background-image 0.3 ease-in;
}
</style>
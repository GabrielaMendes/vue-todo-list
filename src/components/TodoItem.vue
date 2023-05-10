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
  <div
    class="flex items-start px-7 py-6"
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
      class="appearance-none cursor-pointer h-6 w-6 rounded-full mr-4 bg-gray-200 relative focus:outline-none after:h-[22.3px] after:w-[22.3px] after:bg-white after:rounded-full after:absolute after:content-[''] after:left-[1.15px] after:top-[1.15px] before:content-[url('src/assets/images/icon-check.svg')] before:absolute before:left-[7px] before:top-[-1px]"
      :class="{
        'bg-gradient-to-br from-light-blue to-strong-purple-pink relative': applyGradient(),
        'after:hidden': checked,
        'before:hidden': !checked,
      }"
      @click.prevent="toggleChecked"
      @keyup.enter="toggleChecked"
    />

    <p :class="checked ? 'line-through text-gray-300' : ''">{{ props.todo.text }}</p>
    <button
      type="button"
      @click.prevent="removeTodo"
      @focus="removeVisible = true"
      @blur="removeVisible = false"
      class="self-center ml-auto focus:outline-none"
    >
      <img
        v-show="removeVisible"
        src="src/assets/images/icon-cross.svg"
        alt="remove todo"
      />
    </button>
  </div>
</template>

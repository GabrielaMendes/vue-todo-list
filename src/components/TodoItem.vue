<script setup>
import { ref, defineProps } from "vue";
import { getWidth } from '@/utils'

const props = defineProps({
  todo: {
    type: String,
    required: true,
  }
});

const removeVisible = ref(false);
const checkHover = ref(false);
const checked = ref(false);

const toggleChecked = () => {
  checked.value = !checked.value;
};

const applyGradient = () => {
  if (getWidth() < 600) {
    return checked.value
  }

  return  checkHover.value || checked.value
}
</script>

<template>
  <div
    class="flex items-start bg-white px-7 py-6"
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
    />

    <p :class="checked ? 'line-through text-gray-300' : ''">{{ props.todo }}</p>
    <button
      type="button"
      @click.prevent="$emit('removeTodo')"
      class="self-center ml-auto"
    >
      <img
        v-show="removeVisible"
        src="src/assets/images/icon-cross.svg"
        alt="remove todo"
      />
    </button>
  </div>
</template>

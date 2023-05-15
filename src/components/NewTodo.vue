<script setup>
import { vAutoAnimate } from "@formkit/auto-animate";
import { ref, computed } from "vue";

const newTodo = ref("");
const validTodo = computed(() => {
  return newTodo.value.trim().length >= 3;
});
const errorMessage = ref(false);
const addVisible = ref(false);

const emit = defineEmits(["addTodo"]);
const sendTodo = () => {
  if (!validTodo.value) {
    errorMessage.value = true;
    return;
  }

  emit("addTodo", newTodo.value);
  newTodo.value = "";
  errorMessage.value = false;
};
</script>

<template>
  <form
    @submit.prevent="sendTodo"
    class="flex items-start section-style p-reactive relative"
  >
    <input
      type="checkbox"
      name="checkbox"
      id="checkbox"
      disabled
      class="appearance-none h-6 w-6 border-[1.5px] border-gray-200 dark:border-dark-grayish-blue rounded-full mr-4"
    />
    <div v-auto-animate>
      <label for="newTodo" class="hidden">New Todo:</label>
      <input
        id="newTodo"
        type="text"
        placeholder="Create a new todo..."
        v-model="newTodo"
        class="focus:outline-none dark:bg-inherit"
        @blur="
          errorMessage = false;
          addVisible = false;
        "
        @focus="addVisible = true"
      />
      <!-- Error Message -->
      <p v-if="errorMessage && !validTodo" class="text-red-500 text-base">
        Please enter a valid todo!
      </p>
    </div>
    <button
      type="submit"
      @focus="addVisible = true"
      @blur="addVisible = false"
      class="rounded-sm self-center ml-auto my-focus-visible"
    >
      <transition name="fade">
        <img
          v-show="addVisible"
          src="src/assets/images/icon-cross.svg"
          alt="add todo"
          class="transition-color duration-150 ease-in rotate-45 dark:dark-filter hover:add-filter"
        />
      </transition>
    </button>
  </form>
</template>

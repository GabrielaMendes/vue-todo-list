<script setup>
import { ref, computed, defineEmits } from "vue";

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
    class="flex items-start bg-white rounded-md px-7 py-6 relative"
  >
    <input
      type="checkbox"
      name="checkbox"
      id="checkbox"
      disabled
      class="appearance-none h-6 w-6 border-[1.5px] border-gray-200 rounded-full mr-4"
    />
    <div>
      <label for="newTodo" class="hidden">New Todo:</label>
      <input
        id="newTodo"
        type="text"
        placeholder="Create a new todo..."
        v-model="newTodo"
        class="focus:outline-none"
        @blur="errorMessage = false; addVisible = false"
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
      class="self-center ml-auto focus:outline-none"
    >
      <img
        v-show="addVisible"
        src="src/assets/images/icon-cross.svg"
        alt="add todo"
        class="rotate-45"
      />
    </button>
  </form>
</template>

<style scoped>
img:hover,
button:focus {
  filter: invert(56%) sepia(78%) saturate(407%) hue-rotate(182deg) brightness(102%) contrast(96%);
}
</style>

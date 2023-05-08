<script setup>
import { computed, ref } from "vue";
import TheHeader from "@/components/TheHeader.vue";

const newTodo = ref("");
const validTodo = computed(() => {
  return newTodo.value.trim().length >= 3
})
const errorMessage = ref(false);

const addTodo = () => {
  if (!validTodo.value) {
    errorMessage.value = true;
    return;
  }

  todoList.value.push(newTodo.value);
  newTodo.value = "";
  errorMessage.value = false;
};

// dumb data
const todoList = ref([
  "take out trash",
  "study vuejs",
  "go grocery shopping",
  "update profile picture",
]);
</script>

<template>
  <div class="bg-gray-100 min-w-screen min-h-screen">
    <!-- Background Picture -->
    <div
      class="bg-[url('src/assets/images/bg-mobile-light.jpg')] bg-no-repeat bg-top bg-cover w-full h-80 md:bg-[url('src/assets/images/bg-desktop-light.jpg')] md:h-96"
    >
      <!-- App Content -->
      <div class="container pt-16 px-8 max-w-4xl md:pt-24">
        <!-- App Header -->
        <TheHeader />

        <main>
          <!-- New Todo -->
          <form
            @submit.prevent="addTodo"
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
                @blur="errorMessage = false"
              />
                <!-- Error Message -->
                <p
                  v-if="errorMessage && !validTodo"
                  class="text-red-500 text-base"
                >
                  Please enter a valid todo!
                </p>
            </div>
          </form>

          <p v-for="(todo, i) in todoList" :key="i">
            {{ todo }}
          </p>
        </main>
      </div>
    </div>
  </div>
</template>

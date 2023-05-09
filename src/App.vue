<script setup>
import { ref } from "vue";
import TheHeader from "@/components/TheHeader.vue";
import NewTodo from "@/components/NewTodo.vue";
import TodoItem from "@/components/TodoItem.vue";

const addTodo = (newTodo) => {
  todoList.value.push(newTodo);
};

const removeTodo = (index) => {
  console.log('removing')
  todoList.value.splice(index, 1);
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
          <NewTodo @add-todo="addTodo" />

          <!-- Todo List -->
          <div class="mt-5 rounded-md bg-white">
            <TodoItem
              v-for="(todo, i) in todoList"
              :key="i"
              :todo="todo"
              :index="i"
              @remove-todo="removeTodo(i)"
            />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TheHeader from "@/components/TheHeader.vue";
import NewTodo from "@/components/NewTodo.vue";
import TodoItem from "@/components/TodoItem.vue";

const addTodo = (newTodo) => {
  todoList.value.push(newTodo);
};

const removeTodo = (id) => {
  todoList.value = todoList.value.filter((todo) => todo.id !== id);
};

const toggleCompleted = (id) => {
  const index = todoList.value.findIndex((todo) =>  todo.id === id)
  todoList.value[index].completed = !todoList.value[index].completed;
}

// dumb data
const todoList = ref([
  {
    id: crypto.randomUUID(),
    text: "take out trash",
    completed: false,
  },
  {
    id: crypto.randomUUID(),
    text: "study vuejs",
    completed: false,
  },
  {
    id: crypto.randomUUID(),
    text: "go grocery shopping",
    completed: true,
  },
  {
    id: crypto.randomUUID(),
    text: "update profile picture",
    completed: false,
  },
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
            <div v-if="todoList.length === 0" class="text-center px-7 py-6">
              <h3 class="mt-2 mb-3 text-3xl text-transparent font-bold bg-gradient-to-br from-light-blue to-strong-purple-pink bg-clip-text">No todos here</h3>
              <p class="text-base">Add a new todo to start</p>
            </div>
            <TodoItem
              v-for="todo in todoList"
              :key="todo.id"
              :todo="todo"
              @remove-todo="removeTodo(todo.id)"
              @toggle-completed="toggleCompleted(todo.id)"
            />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

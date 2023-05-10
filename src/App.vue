<script setup>
import { computed, ref } from "vue";
import TheHeader from "@/components/TheHeader.vue";
import NewTodo from "@/components/NewTodo.vue";
import TodoItem from "@/components/TodoItem.vue";

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

const addTodo = (newTodoText) => {
  todoList.value.push({
    id: crypto.randomUUID(),
    text: newTodoText,
    completed: false,
  });
};

const removeTodo = (id) => {
  todoList.value = todoList.value.filter((todo) => todo.id !== id);
};

const clearCompleted = () => {
  todoList.value.forEach((todo) => {
    todo.completed = false;
  });
};

const toggleCompleted = (id) => {
  const todo = todoList.value.find((todo) => todo.id === id);
  todo.completed = !todo.completed;
};

const todosLeft = computed(() => {
  return todoList.value.filter((todo) => !todo.completed);
});

const todosCompleted = computed(() => {
  return todoList.value.filter((todo) => todo.completed);
});

const filter = ref("All");

const changeFilter = (option) => {
  filter.value = option;
};
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
              <h3
                class="mt-2 mb-3 text-3xl text-transparent font-bold bg-gradient-to-br from-light-blue to-strong-purple-pink bg-clip-text"
              >
                No todos here
              </h3>
              <p class="text-base">Add a new todo to start</p>
            </div>

            <TodoItem
              v-for="todo in todoList"
              :key="todo.id"
              :todo="todo"
              @remove-todo="removeTodo"
              @toggle-completed="toggleCompleted"
            />

            <!-- Summary, Filters and Clear -->
            <div class="text-dark-grayish-blue flex justify-between px-7 py-6">
              <p class="text-base">{{ todosLeft.length }} items left</p>
              <ul class="hidden md:flex gap-5 md:relative md:left-6">
                <li
                  role="button"
                  class="hover:text-very-dark-grayish-blue"
                  :class="filter === 'All' ? 'text-blue-500 pointer-events-none' : ''"
                >
                  All
                </li>
                <li
                  role="button"
                  class="hover:text-very-dark-grayish-blue"
                  :class="filter === 'Active' ? 'text-blue-500 pointer-events-none' : ''"
                >
                  Active
                </li>
                <li
                  role="button"
                  class="hover:text-very-dark-grayish-blue"
                  :class="filter === 'Completed' ? 'text-blue-500 pointer-events-none' : ''"
                >
                  Completed
                </li>
              </ul>
              <button
                type="button"
                @click.prevent="clearCompleted"
                class="text-base hover:text-very-dark-grayish-blue"
              >
                Clear Completed
              </button>
            </div>
          </div>

          <!-- Filters Mobile -->
          <div class="text-dark-grayish-blue mt-5 rounded-md bg-white">
            <ul class="px-7 py-6 justify-center flex gap-5">
              <li role="button" class="hover:text-very-dark-grayish-blue">
                All
              </li>
              <li role="button" class="hover:text-very-dark-grayish-blue">
                Active
              </li>
              <li role="button" class="hover:text-very-dark-grayish-blue">
                Completed
              </li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

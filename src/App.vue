<script setup>
import { computed, onMounted, ref, watch } from "vue";
import TheHeader from "@/components/TheHeader.vue";
import NewTodo from "@/components/NewTodo.vue";
import TodoItem from "@/components/TodoItem.vue";
import BaseFilterButton from "./components/BaseFilterButton.vue";
import { watchDeep } from '@vueuse/core'


const todoList = ref([])

watchDeep(todoList, (newValue) => {
  localStorage.setItem('todoList', JSON.stringify(newValue))
})

const filter = ref("All");

watch(filter, (newValue) => {
  localStorage.setItem('filter', newValue)
})

onMounted(() => {
  todoList.value = JSON.parse(localStorage.getItem('todoList')) || []
  filter.value = localStorage.getItem('filter')|| "All"
})

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

const changeFilter = (option) => {
  filter.value = option;
};

const todosToShow = computed(() => {
  if (filter.value === "Active") {
    return todosLeft.value;
  }

  if (filter.value === "Completed") {
    return todosCompleted.value;
  }

  return todoList.value;
});
</script>

<template>
  <div class="min-w-screen min-h-screen">
    <!-- Background Picture -->
    <div
      class="bg-[url('src/assets/images/bg-mobile-light.jpg')] bg-no-repeat bg-top bg-cover w-full h-[278px] md:bg-[url('src/assets/images/bg-desktop-light.jpg')] md:h-[360px]"
    >
      <!-- App Content -->
      <div class="container pt-16 px-8 max-w-4xl md:pt-24">
        <!-- App Header -->
        <TheHeader />

        <main>
          <!-- New Todo -->
          <NewTodo @add-todo="addTodo" />

          <!-- Todo List -->
          <div class="mt-5 rounded-md bg-white shadow-custom">
            <div v-if="todoList.length === 0" class="text-center px-7 py-6">
              <h3
                class="mt-2 mb-3 text-3xl text-transparent font-bold bg-gradient-to-br from-light-blue to-strong-purple-pink bg-clip-text"
              >
                No todos here
              </h3>
              <p class="text-base">Add a new todo to start</p>
            </div>

            <TodoItem
              v-for="todo in todosToShow"
              :key="todo.id"
              :todo="todo"
              @remove-todo="removeTodo"
              @toggle-completed="toggleCompleted"
            />

            <!-- Summary, Filters and Clear -->
            <div class="text-dark-grayish-blue flex justify-between px-7 py-6 border-t-[1px] border-gray-200">
              <p class="text-sm">{{ todosLeft.length }} items left</p>
              <div
                id="filters"
                class="text-base hidden md:flex gap-5 md:relative md:left-6"
              >
                <BaseFilterButton
                  :currentFilter="filter"
                  @change-filter="changeFilter"
                  >All</BaseFilterButton
                >
                <BaseFilterButton
                  :currentFilter="filter"
                  @change-filter="changeFilter"
                  >Active</BaseFilterButton
                >
                <BaseFilterButton
                  :currentFilter="filter"
                  @change-filter="changeFilter"
                  >Completed</BaseFilterButton
                >
              </div>
              <button
                type="button"
                @click.prevent="clearCompleted"
                class="rounded-sm text-sm hover:text-very-dark-grayish-blue my-focus-visible"
              >
                Clear Completed
              </button>
            </div>
          </div>

          <!-- Filters Mobile -->
          <div class="text-dark-grayish-blue  text-base mt-5 rounded-md bg-white md:hidden">
            <div class="p-reactive only:justify-center flex gap-5">
              <BaseFilterButton
                :currentFilter="filter"
                @change-filter="changeFilter"
                >All</BaseFilterButton
              >
              <BaseFilterButton
                :currentFilter="filter"
                @change-filter="changeFilter"
                >Active</BaseFilterButton
              >
              <BaseFilterButton
                :currentFilter="filter"
                @change-filter="changeFilter"
                >Completed</BaseFilterButton
              >
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

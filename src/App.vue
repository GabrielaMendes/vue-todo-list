<script setup>
import { vAutoAnimate } from "@formkit/auto-animate";
import { useAutoAnimate } from "@formkit/auto-animate/vue"
import { watchDeep } from "@vueuse/core";
import draggable from "vuedraggable";
import { computed, onMounted, ref, watch } from "vue";
import TheHeader from "@/components/TheHeader.vue";
import NewTodo from "@/components/NewTodo.vue";
import TodoItem from "@/components/TodoItem.vue";
import BaseFilterButton from "@/components/BaseFilterButton.vue";

const todoList = ref([]);

watchDeep(todoList, (newValue) => {
  localStorage.setItem("todoList", JSON.stringify(newValue));
});

const filter = ref("All");

watch(filter, (newValue) => {
  localStorage.setItem("filter", newValue);
});

onMounted(() => {
  todoList.value = JSON.parse(localStorage.getItem("todoList")) || [];
  filter.value = localStorage.getItem("filter") || "All";
});

const addTodo = (newTodoText) => {
  todoList.value.unshift({
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

// const [drag] = useAutoAnimate()

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
          <div v-auto-animate class="mt-5 rounded-md bg-white shadow-custom">
            <div v-if="todoList.length === 0" class="text-center px-7 py-6">
              <h3
                class="mt-2 mb-3 text-3xl text-transparent font-bold my-gradient bg-clip-text"
              >
                No todos here
              </h3>
              <p class="text-base">Add a new todo to start</p>
            </div>

            <!-- Draggable only when full list -->
            <draggable
              v-if="filter === 'All'"
              v-auto-animate
              ref="drag"
              tag="ul"
              v-model="todoList"
              item-key="id"
              drag-class="drag"
              ghost-class="ghost"
            >
              <template #item="{ element }">
                <TodoItem
                  :todo="element"
                  @remove-todo="removeTodo"
                  @toggle-completed="toggleCompleted"
                />
              </template>
            </draggable>

            <!-- Not allowed to drag -->
            <ul v-else v-auto-animate>
              <TodoItem
                v-for="todo in todosToShow"
                :key="todo.id"
                :todo="todo"
                @remove-todo="removeTodo"
                @toggle-completed="toggleCompleted"
              />
            </ul>

            <!-- Summary, Filters and Clear -->
            <div
              class="text-dark-grayish-blue grid grid-cols-2 md:grid-cols-3 p-reactive border-t-[1px] border-gray-200"
              :class="todoList.length === 0 ? ' hidden': ''"
            >
              <p class="text-sm">{{ todosLeft.length }} items left</p>
              <div
                id="filters"
                class="justify-self-center text-base hidden md:flex gap-5 "
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
                class="rounded-sm text-right text-sm my-focus-visible hover:text-very-dark-grayish-blue"
              >
                Clear Completed
              </button>
            </div>
          </div>

          <!-- Filters Mobile -->
          <transition name="fade">
            <div
              class="text-dark-grayish-blue text-base mt-5 rounded-md bg-white"
              :class="todoList.length === 0 ? ' hidden': ''"
            >
              <div class="p-reactive flex gap-5 justify-center md:hidden">
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
          </transition>
        </main>

        <transition name="fade">
          <footer
            v-show="filter === 'All'"
            class="w-full mt-10 pb-5 text-center text-base text-dark-grayish-blue"
          >
            Drag and drop to reorder list
          </footer>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import TheHeader from "@/components/TheHeader.vue";
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
          <form @submit="addTodo" class="flex items-start bg-white rounded-md px-7 py-6">
            <input type="checkbox" name="checkbox" id="checkbox" disabled class="appearance-none h-6 w-6 border-[1.5px] border-gray-200 rounded-full mr-4">
            <input type="text" placeholder="Create a new todo..." class="focus:outline-none">
          </form>
        </main>
      </div>
    </div>
  </div>
</template>

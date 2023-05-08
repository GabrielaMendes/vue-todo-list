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
      </div>
    </div>
  </div>
</template>

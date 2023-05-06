<script setup></script>

<template>
  <div class="bg-gray-100 min-w-screen min-h-screen relative">
    <!-- Background Picture -->
    <picture>
      <source
        media="(min-width:640px)"
        srcset="@/assets/images/bg-desktop-light.jpg"
        class="w-full h-auto object-cover absolute"
      />
      <img
        src="@/assets/images/bg-mobile-light.jpg"
        class="w-full h-auto object-cover absolute"
      />
    </picture>
  </div>
</template>

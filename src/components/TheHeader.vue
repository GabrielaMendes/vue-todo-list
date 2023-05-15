<script setup>
import { ref } from "vue";

const props = defineProps({
  isDark: {
    required: true,
  },
});

const emit = defineEmits(["toggleDark"]);

const icon = ref(null);

const toggleDark = () => {
  emit("toggleDark");

  icon.value.classList.add("opacity-0");
  icon.value.classList.remove("opacity-100");

  setTimeout(() => {
    icon.value.classList.remove("opacity-0");
    icon.value.classList.add("opacity-100");
  }, 200);
};
</script>

<template>
  <header class="flex items-center justify-between mb-12 md:items-start">
    <h1 class="font-bold text-4xl text-white tracking-[.3em] md:text-6xl">
      TODO
    </h1>
    <button
      type="button"
      @click.prevent="toggleDark"
      class="rounded-full my-focus-visible focus-visible:ring-offset-[#8C94F7] dark:focus-visible:ring-offset-[#6A218A]"
    >
      <img
        ref="icon"
        :src="
          !props.isDark
            ? 'src/assets/images/icon-moon.svg'
            : 'src/assets/images/icon-sun.svg'
        "
        alt="moon icon"
        class="w-full h-7 md:h-11 transition-opacity duration-300 ease-out"
      />
    </button>
  </header>
</template>

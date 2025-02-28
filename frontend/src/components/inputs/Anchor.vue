<script setup>
defineProps(['href', 'text']);
</script>

<template>
  <a :href="href" class="bg-cyan-900 hover:bg-cyan-800 p-2 rounded cursor-pointer">
    {{ text }}
  </a>
</template>
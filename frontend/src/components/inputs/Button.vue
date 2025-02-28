<script setup>
defineProps(['onClick', 'text']);
</script>

<template>
  <button @click="onClick" class="bg-cyan-900 hover:bg-cyan-800 p-2 rounded cursor-pointer">
    {{ text }}
  </button>
</template>
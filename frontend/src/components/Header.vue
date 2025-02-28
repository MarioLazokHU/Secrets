<script setup>
import { useRouter } from 'vue-router';
import Button from './inputs/Button.vue';

const router = useRouter();

const goToSecrets = () => {
  router.push('/secrets');
};

const goToAddSecret = () => {
  router.push('/add-secret');
};
</script>

<template>
  <header class="bg-gray-900 text-white flex justify-between items-center gap-5 p-4">
    <h1 class="text-2xl font-bold">Secrets HUB</h1>
    <div class="flex gap-5">
      <Button :onClick="goToSecrets" text="Our Secrets" />
      <Button :onClick="goToAddSecret" text="Add New Secret" />
    </div>
  </header>
</template>
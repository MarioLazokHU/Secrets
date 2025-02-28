<script setup>
import { ref } from 'vue';
import Swal from 'sweetalert2';

const formData = ref({
    secret: '',
    expiredAfterViews: 0,
    expireAfter: 0
});

const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/secret/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData.value)
    });

    const data = await response.json();

    if (data.success) {
        Swal.fire({
            title: 'Secret created successfully!',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
        });
        event.target.reset();
    } else {
        Swal.fire({
            title: 'Error!',
            text: 'An error occurred while creating the secret',
            icon: 'error'
        })
    }
};
</script>

<template>
    <h2 class="p-3 text-3xl">
        You have new Secret?
    </h2>
    <div class="flex flex-col items-center justify-center">
        <form class="border border-gray-900  p-5 mt-5" @submit="handleSubmit">
            <h3 class="text-2xl font-bold mt-5 mb-5">Add New Secret</h3>
            <div class="flex justify-between items-center p-3 gap-2">
                <label for="secret">Secret:</label>
                <input class="border p-1 border-gray-900 rounded" type="text" id="secret" v-model="formData.secret"
                    required />
            </div>
            <div class="flex justify-between items-center p-3 gap-2">
                <label for="expiredAfterViews">Views before expiration:</label>
                <input class="border p-1 border-gray-900 rounded" type="number" id="expiredAfterViews"
                    v-model="formData.expiredAfterViews" required />
            </div>
            <div class="flex justify-between items-center p-3 gap-2">
                <label for="expireAfter">Expiration time (minutes):</label>
                <input class="border p-1 border-gray-900 rounded" type="number" id="expireAfter"
                    v-model="formData.expireAfter" required />
            </div>
            <div class="flex justify-end">
                <button class="bg-cyan-900 hover:bg-cyan-800 p-2 mt-5 mb-5 rounded cursor-pointer" type="submit">Add
                    Secret</button>
            </div>
        </form>
    </div>
</template>
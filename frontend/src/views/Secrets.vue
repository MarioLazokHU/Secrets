<script setup>
import { onMounted, ref } from 'vue';
import { format } from 'date-fns';
import Swal from 'sweetalert2';

const secrets = ref([]);

onMounted(() => {
    getSecrets();
});

const getSecrets = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/secret-list`);
    const data = await response.json();
    
    secrets.value = data;
};

const viewSecret = (secret) => {
    Swal.fire({
        title: 'Do you want to view the secret?',
        text: `Remain views ${secret.expiredAfterViews - secret.views}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
    }).then(async (result) => {
        if (result.isConfirmed) {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/secret-view`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ hash: secret.hash })
            });
            const data = await response.json();

            if (data.secret) {
                Swal.fire({
                    title: 'Secret',
                    html: `Your secret is: <b>${data.secret}</b>`,
                    icon: 'success'
                });
                getSecrets();
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: data.error ?? 'An error occurred while viewing the secret',
                    icon: 'error'
                });
            }
        }
    });

};

</script>

<template>
    <h2 class="p-3 text-3xl">Our stored Secrets</h2>
    <div class="overflow-y-hidden flex flex-col items-center justify-center">
        <div>
            <div class="border-b border-gray-600 p-2 grid grid-cols-4 items-center gap-5 mt-10 rounded">
                <h3 class="text-xl font-bold">Created at</h3>
                <h3 class="text-xl font-bold">Views left</h3>
                <h3 class="text-xl font-bold">Expires at</h3>
                <h3 class="text-xl font-bold">View</h3>
            </div>
            <div v-for="secret in secrets" :key="secret.id"
                class="border-b border-gray-600 p-2 grid grid-cols-4 items-center gap-5 rounded">
                <h3 class="text-xl font-bold">
                    {{ format(new Date(secret.createdAt), 'yyyy-MM-dd HH:mm:ss') }}
                </h3>
                <p>
                    Views left: <strong class="border border-gray-900 p-1 rounded">{{ secret.expiredAfterViews -
                        secret.views }}</strong>
                </p>

                <p>Expires at: {{ format(new Date(secret.expirationDate), 'yyyy-MM-dd HH:mm:ss') }}</p>
                <button :onClick="() => viewSecret(secret)" :disabled="secret.expired"
                    :class="secret.expired ? 'bg-gray-500 hover:bg-gray-500' : ''"
                    class="border border-gray-900 p-2 rounded cursor-pointer bg-cyan-900 hover:bg-cyan-800">
                    {{ secret.expired ? 'Expired' : 'View' }}
                </button>
            </div>
        </div>
    </div>
</template>
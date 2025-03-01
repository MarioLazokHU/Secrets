<script setup>
import { onMounted, ref } from 'vue';
import { format } from 'date-fns';
import Swal from 'sweetalert2';

const secrets = ref([]);

onMounted(() => {
    getSecrets();
});

const getSecrets = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/secrets`);
    const data = await response.json();
    
    secrets.value = data;
};

const viewSecret = (secret) => {
    const secretUrl = `${import.meta.env.VITE_API_BASE_URL}/secret/${secret.hash}`;
    Swal.fire({
        title: 'Do you want to view the secret?',
        html: `
            <div>
                <p>Remain views: ${secret.expiredAfterViews - secret.views}</p>
                <button id="copy-url" class="bg-blue-600 cursor-pointer rounded shadow-sm p-1 text-white">Copy URL</button>
            </div>`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        didOpen: () => {
            const copyButton = Swal.getPopup().querySelector('#copy-url');
            copyButton.addEventListener('click', () => {
                navigator.clipboard.writeText(secretUrl).then(() => {
                    Swal.fire({
                        title: 'Copied!',
                        text: 'The URL has been copied to your clipboard.',
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false,
                        toast: true
                    });
                }).catch(err => {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Failed to copy the URL.',
                        icon: 'error'
                    });
                });
            });
        }
    }).then(async (result) => {
        if (result.isConfirmed) {
            const response = await fetch(secretUrl);
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
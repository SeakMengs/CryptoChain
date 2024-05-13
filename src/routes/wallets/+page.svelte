<script lang="ts">
    import Modal from "$lib/components/Modal.svelte";
    import { onMount } from "svelte";
    interface Wallet {
        id: string;
        publicKey: string;
    }
    interface NewWallet {
        id: string;
        publicKey: string;
        privateKey: string;
    }
    let wallets: Wallet[] = [];
    let newWallet: NewWallet = {
        id: "adsad",
        publicKey:
            "04706fbbad79690f8adbfdffac9cf721e1a1bca1c3cb12aeb006acd15007a6954266799a1540dd5c45bfce44dd3065694b0280cf33a7bece7377a9483f9fbad39e",
        privateKey:
            "04706fbbad79690f8adbfdffac9cf721e1a1bca1c3cb12aeb006acd15007a6954266799a1540dd5c45bfce44dd3065694b0280cf33a7bece7377a9483f9fbad39e",
    };
    let createWalletOverlay = false;
    onMount(() => {
        getWallets();
    });

    function getWallets() {
        fetch("/api/wallet/all")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                wallets = data.wallets;
            });
    }

    function createWallet() {
        fetch("/api/wallet/create", {
            method: "POST",
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                createWalletOverlay = true;
                newWallet = data.wallet;
            });
    }

    function closeCreateWallet() {
        createWalletOverlay = false;
        getWallets();
    }
</script>

{#if createWalletOverlay}
    <Modal className="w-[500px] grid gap-2" on:close={closeCreateWallet}>
        <h1 class="text-2xl font-bold mb-4 text-yellow-500">New Wallet Info</h1>
        <div class="grid grid-cols-4">
            <h2 class="font-bold">Address:</h2>
            <p class="break-words col-span-3 bg-gray-700 rounded-md p-2">
                {newWallet.id}
            </p>
        </div>
        <div class="grid grid-cols-4">
            <h2 class="font-bold">Public Key:</h2>
            <p class="break-words col-span-3 bg-gray-700 rounded-md p-2">
                {newWallet.publicKey}
            </p>
        </div>
        <div class="grid grid-cols-4">
            <h2 class="font-bold">Private Key:</h2>
            <p class="break-words col-span-3 bg-gray-700 rounded-md p-2">
                {newWallet.privateKey}
            </p>
        </div>
        <div class="flex justify-end mt-4">
            <button
                on:click={closeCreateWallet}
                class="text-white bg-yellow-500 px-3 py-1 rounded-md hover:bg-yellow-400 transition-all"
                >OK</button
            >
        </div>
    </Modal>
{/if}
<div
    class="container mx-auto pt-12 flex justify-center items-center dark:bg-gray-900"
>
    <div class="relative shadow-md p-4 w-full">
        <div class="flex justify-between items-end">
            <h1 class="text-3xl font-bold text-yellow-500">Wallets</h1>
            <div>
                <button
                    on:click={createWallet}
                    class=" text-white bg-yellow-500 px-1 py-1 rounded-md hover:bg-yellow-400 transition-all"
                    ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-plus w-6 stroke-white"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="#2c3e50"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 5l0 14" />
                        <path d="M5 12l14 0" />
                    </svg>
                </button>
            </div>
        </div>

        <table
            class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-4"
        >
            <thead
                class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
                <tr>
                    <th scope="col" class="px-6 py-3">Address</th>
                    <th scope="col" class="px-6 py-3">Public key</th>
                </tr>
            </thead>
            <tbody>
                {#each wallets as wallet}
                    <tr class="border-b dark:bg-gray-800 dark:border-gray-700">
                        <td
                            class="max-w-[120px] text-ellipsis truncate px-6 py-4"
                        >
                            {wallet.id}
                        </td>
                        <td
                            class="max-w-[400px] text-ellipsis truncate px-6 py-4"
                        >
                            {wallet.publicKey}
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>

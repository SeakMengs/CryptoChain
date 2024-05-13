<script lang="ts">
    import type { Transaction } from "$lib/blockchain";
    import Modal from "$lib/components/Modal.svelte";
    import { onMount } from "svelte";

    let showCreateTransaction = false;
    let showMiningTransactions = false;
    let showLoading = false;
    let transactions: Transaction[] = [];
    let asset = "YatoCoin",
        sender = "network",
        signature =
            "2bc6e112c479cad3e83aefa0e140f314a1f13cbb3774248bd9e7dc31f74595ea",
        receiver = "0c830809-1d4c-4798-9de4-1d3e54ce6b8e",
        amount = 2;
    let minerWallet = "c0c8ac05-e825-4c0c-888d-84f0bb1e2040";
    onMount(() => {
        getPendingTransactions();
    });

    function getPendingTransactions() {
        fetch("/api/transaction/all")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                transactions = data.transactions;
            });
    }

    function createTransaction() {
        fetch("/api/transaction/create", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                signature: signature,
                transaction: {
                    asset: asset,
                    sender: sender,
                    receiver: receiver,
                    amount: amount,
                    timestamp: new Date(),
                },
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.success) {
                    closeCreateTransaction();
                }
            });
    }

    function closeCreateTransaction() {
        showCreateTransaction = false;
        asset = "YatoCoin";
        sender = "network";
        signature =
            "2bc6e112c479cad3e83aefa0e140f314a1f13cbb3774248bd9e7dc31f74595ea";
        receiver = "0c830809-1d4c-4798-9de4-1d3e54ce6b8e";
        amount = 2;
        getPendingTransactions();
    }

    function minePendingTransactions() {
        showMiningTransactions = false;
        showLoading = true;
        fetch("/api/transaction/mine", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                minerWallet: minerWallet,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.success) {
                    closeMining();
                    getPendingTransactions();
                }
            });
    }

    function closeMining() {
        showLoading = false;
        showMiningTransactions = false;
        minerWallet = "0c0ff11f-6e96-4600-b13d-8e4bcf7b5b58";
    }
</script>

{#if showLoading}
    <Modal className="w-[500px] grid gap-2 relative h-[200px]">
        <img
            src="/golden_pickaxe.png"
            class="w-24 absolute top-[50%] left-[30%] animate-mining"
            alt=""
        />
        <img
            src="/gold_ore.png"
            class="w-24 absolute top-[50%] left-[55%] translate-y-[-50%]"
            alt=""
        />
    </Modal>
{/if}
{#if showMiningTransactions}
    <Modal className="w-[500px] grid gap-2" on:close={closeMining}>
        <h1 class="text-2xl font-bold mb-4 text-yellow-500">Start Mining</h1>
        <div class="grid gap-3">
            <div class="grid gap-2">
                <h2>Miner Wallet</h2>
                <input
                    bind:value={minerWallet}
                    type="text"
                    class="w-full px-3 py-2 bg-gray-700 border border-gray-600 focus:border-yellow-500 focus:outline-none rounded-sm"
                />
            </div>
            <div class="flex justify-end mt-4">
                <button
                    on:click={minePendingTransactions}
                    class="text-white bg-yellow-500 px-3 py-1 rounded-md hover:bg-yellow-400 transition-all"
                    >Start</button
                >
            </div>
        </div>
    </Modal>
{/if}
{#if showCreateTransaction}
    <Modal className="w-[500px] grid gap-2" on:close={closeCreateTransaction}>
        <h1 class="text-2xl font-bold mb-4 text-yellow-500">
            Create Transaction
        </h1>
        <div class="grid gap-3">
            <div class="grid gap-2">
                <h2>Asset</h2>
                <input
                    bind:value={asset}
                    type="text"
                    class="w-full px-3 py-2 bg-gray-700 border border-gray-600 focus:border-yellow-500 focus:outline-none rounded-sm"
                />
            </div>
            <div class="grid gap-2">
                <h2>Sender</h2>
                <input
                    bind:value={sender}
                    type="text"
                    class="w-full px-3 py-2 bg-gray-700 border border-gray-600 focus:border-yellow-500 focus:outline-none rounded-sm"
                />
            </div>
            <div class="grid gap-2">
                <h2>Signature</h2>
                <input
                    bind:value={signature}
                    type="text"
                    class="w-full px-3 py-2 bg-gray-700 border border-gray-600 focus:border-yellow-500 focus:outline-none rounded-sm"
                />
            </div>
            <div class="grid gap-2">
                <h2>Receiver</h2>
                <input
                    bind:value={receiver}
                    type="text"
                    class="w-full px-3 py-2 bg-gray-700 border border-gray-600 focus:border-yellow-500 focus:outline-none rounded-sm"
                />
            </div>
            <div class="grid gap-2">
                <h2>Amount</h2>
                <input
                    bind:value={amount}
                    type="number"
                    class="w-full px-3 py-2 bg-gray-700 border border-gray-600 focus:border-yellow-500 focus:outline-none rounded-sm"
                />
            </div>
            <div class="flex justify-end mt-4">
                <button
                    on:click={createTransaction}
                    class="text-white bg-yellow-500 px-3 py-1 rounded-md hover:bg-yellow-400 transition-all"
                    >Create</button
                >
            </div>
        </div>
    </Modal>
{/if}

<div
    class="container mx-auto pt-12 flex justify-center items-center dark:bg-gray-900"
>
    <div class="relative shadow-md p-4 w-full">
        <div class="flex justify-between items-end">
            <h1 class="text-3xl font-bold text-yellow-500">
                Pending Transactions
            </h1>
            <div class="flex gap-2">
                <button
                    on:click={() => (showCreateTransaction = true)}
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
                <button
                    on:click={() => (showMiningTransactions = true)}
                    class=" text-white bg-yellow-500 px-1 py-1 rounded-md hover:bg-yellow-400 transition-all"
                    ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-backhoe w-6 stroke-white"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="#2c3e50"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                        <path d="M13 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                        <path d="M13 19l-9 0" />
                        <path d="M4 15l9 0" />
                        <path d="M8 12v-5h2a3 3 0 0 1 3 3v5" />
                        <path d="M5 15v-2a1 1 0 0 1 1 -1h7" />
                        <path d="M21.12 9.88l-3.12 -4.88l-5 5" />
                        <path
                            d="M21.12 9.88a3 3 0 0 1 -2.12 5.12a3 3 0 0 1 -2.12 -.88l4.24 -4.24z"
                        />
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
                    <th scope="col" class="px-6 py-3">Asset</th>
                    <th scope="col" class="px-6 py-3">Sender</th>
                    <th scope="col" class="px-6 py-3">Receiver</th>
                    <th scope="col" class="px-6 py-3">Amount</th>
                </tr>
            </thead>
            <tbody
                >{#each transactions as transaction}
                    <tr class="border-b dark:bg-gray-800 dark:border-gray-700">
                        <td
                            class="max-w-[120px] text-ellipsis truncate px-6 py-4"
                        >
                            {transaction.asset}
                        </td>
                        <td
                            class="max-w-[400px] text-ellipsis truncate px-6 py-4"
                        >
                            {transaction.sender}
                        </td>
                        <td
                            class="max-w-[400px] text-ellipsis truncate px-6 py-4"
                        >
                            {transaction.receiver}
                        </td>
                        <td
                            class="max-w-[400px] text-ellipsis truncate px-6 py-4"
                        >
                            {transaction.amount}
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>

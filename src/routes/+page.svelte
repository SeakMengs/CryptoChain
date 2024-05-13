<script lang="ts">
    import { formatDate } from "$lib";
    import type { Block } from "$lib/blockchain";
    import { onMount } from "svelte";

    let isValid = false;

    let blocks: Block[] = [];

    function verifyBlockchain() {
        fetch("/api/block/verify")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    isValid = data.success;
                }
            });
    }

    onMount(() => {
        fetch("/api/block/all")
            .then((res) => res.json())
            .then((data) => {
                console.log(data.blocks);
                blocks = data.blocks;
            });
    });
</script>

<div
    class="container mx-auto pt-12 flex justify-center items-center dark:bg-gray-900"
>
    <div class="relative shadow-md p-4 w-full">
        <div class="flex justify-between items-end mb-4">
            <h1 class="text-3xl font-bold text-yellow-500">Blocks</h1>
            <div class="flex justify-end gap-4">
                {#if isValid}
                    <div class="flex items-center space-x-2 py-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            class="h-6 w-6 text-green-500"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M5 13l4 4L19 7"
                            ></path>
                        </svg>
                        <span
                            class=" text-center text-gray-500 dark:text-gray-400"
                            >Blockchain is valid</span
                        >
                    </div>
                {/if}
                <button
                    type="button"
                    on:click={verifyBlockchain}
                    class=" text-white bg-yellow-500 px-2 py-1 rounded-md hover:bg-yellow-400 transition-all"
                    >Verify Blockchain</button
                >
            </div>
        </div>

        <table
            class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
            <thead
                class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
                <tr>
                    <th scope="col" class="px-5 py-3">Transactions</th>
                    <th scope="col" class="px-5 py-3">Previous Hash</th>
                    <th scope="col" class="px-5 py-3">Hash</th>
                    <th scope="col" class="px-5 py-3">Nonce</th>
                    <th scope="col" class="px-5 py-3">Timestamp</th>
                </tr>
            </thead>
            <tbody>
                {#each blocks as block}
                    <tr
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 table-auto"
                    >
                        <td class="px-6 py-4 flex flex-col gap-4">
                            {#each block.transactions as transaction}
                                <div class="bg-gray-700 p-4 rounded-md">
                                    <div class="flex justify-between">
                                        <h3>
                                            <span
                                                class="text-yellow-500 font-bold"
                                                >Asset</span
                                            >: {transaction.asset}
                                        </h3>
                                        <h3>
                                            {formatDate(transaction.timestamp)}
                                        </h3>
                                    </div>
                                    <h3>
                                        <span class="text-yellow-500 font-bold"
                                            >Sender</span
                                        >: {transaction.sender}
                                    </h3>
                                    <h3>
                                        <span class="text-yellow-500 font-bold"
                                            >Receiver</span
                                        >: {transaction.receiver}
                                    </h3>
                                    <h3>
                                        <span class="text-yellow-500 font-bold"
                                            >Amount</span
                                        >: {transaction.amount}
                                    </h3>
                                </div>
                            {/each}
                        </td>
                        <td
                            class="max-w-[120px] text-ellipsis truncate px-6 py-4"
                        >
                            {block.previousHash}
                        </td>
                        <td
                            class="max-w-[120px] text-ellipsis truncate px-6 py-4"
                            >{block.hash}</td
                        >
                        <td>{block.nonce}</td>
                        <td class="px-6 py-4">{formatDate(block.timestamp)}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>

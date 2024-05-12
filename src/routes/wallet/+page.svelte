<script>
    /**
     * @type {string | null}
     */
    let copyMessage = null;

    /**
     * @param {string} address
     */
    async function copyAddress(address) {
        try {
            await navigator.clipboard.writeText(address);
            copyMessage = "Address copied!";
        } catch (err) {
            copyMessage = "Failed to copy address!";
        }
    }
</script>

<body class="w-full pt-12 flex justify-center items-center dark:bg-gray-900">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <p
            class="max-w-lg text-3xl font-semibold leading-normal text-gray-900 dark:text-white py-7 px-2"
        >
            Wallet Page
        </p>

        <table
            class="w-[1400px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
            <thead
                class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
                <tr>
                    <th scope="col" class="px-2 py-1"> index </th>
                    <th scope="col" class="px-6 py-3"> Address </th>
                    <th scope="col" class="px-6 py-3 text-center"> Action </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                    <td
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                        1
                    </td>

                    <td class="px-6 py-4">
                        dwaddfasfdshfjkdsghfhjksdagfhjdsagfhadsgf
                        hjadsgfhjksadgfhjdsagfhjadsgfhjsdgfhjdjsagahjkfjdghsjkafjgadshkjfgadhjskfghyukadsujfghjdwadsafsdf
                    </td>
                    <td
                        class="px-6 py-4 flex justify-center flex-col items-center"
                    >
                        <button
                            type="button"
                            on:click={() => copyAddress("address")}
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            >Copy Address</button
                        >
                        {#if copyMessage}
                            <span class="text-green-500 text-xs"
                                >{copyMessage}</span
                            >
                        {/if}
                    </td>
                </tr>
                 <tr
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                    <td
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                        2
                    </td>

                    <td class="px-6 py-4">
                        heeedwaddfasfdshfjkdsghfhjksdagfhjdsagfhadsgf
                        hjadsgfhjksadgfhjdsagfhjadsgfhjsdgfhjdjsagahjkfjdghsjkafjgadshkjfgadhjskfghyukadsujfghjdwadsafsdf
                    </td>
                    <td
                        class="px-6 py-4 flex justify-center flex-col items-center"
                    >
                        <button
                            type="button"
                            on:click={() => copyAddress("address")}
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            >Copy Address</button
                        >
                        {#if copyMessage}
                            <span class="text-green-500 text-xs"
                                >{copyMessage}</span
                            >
                        {/if}
                    </td>
                </tr>
                 <tr
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                    <td
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                        1
                    </td>

                    <td class="px-6 py-4">
                        whatttdwaddfasfdshfjkdsghfhjksdagfhjdsagfhadsgf
                        hjadsgfhjksadgfhjdsagfhjadsgfhjsdgfhjdjsagahjkfjdghsjkafjgadshkjfgadhjskfghyukadsujfghjdwadsafsdf
                    </td>
                    <td
                        class="px-6 py-4 flex justify-center flex-col items-center"
                    >
                        <button
                            type="button"
                            on:click={() => copyAddress("address")}
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            >Copy Address</button
                        >
                        {#if copyMessage}
                            <span class="text-green-500 text-xs"
                                >{copyMessage}</span
                            >
                        {/if}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</body>

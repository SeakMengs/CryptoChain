<body class="w-full flex justify-center items-center dark:bg-gray-900">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <p
            class="max-w-lg text-3xl font-semibold leading-normal text-gray-900 dark:text-white py-7 text-center"
        >
            Add Transaction Page
        </p>

        <div
            class="w-[1400px] max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"
        >
            <form class="space-y-6" action="#">
                <h5 class="text-xl font-medium text-gray-900 dark:text-white">
                    Create transaction
                </h5>
                <div>
                    <label
                        for="from"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >From</label
                    >
                    <input
                        type="from"
                        name="from"
                        id="from"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="04746dd3e2bf45672a98a08ebae96406cd25deb15a2574bbd6d1c2fc9c55f3928fbb36706a6440dd43c253f6d32a8de455b52f12cd50dfd636243b477b5286fcfb"
                        required
                    />
                </div>
                <div>
                    <label
                        for="To"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >To</label
                    >
                    <input
                        type="To"
                        name="To"
                        id="To"
                        placeholder="Address of Receiver"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                    />
                </div>
                <div>
                    <label
                        for="amount"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Amount</label
                    >
                    <input
                        type="amount"
                        name="amount"
                        id="amount"
                        placeholder="Address of Receiver"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                    />
                </div>

                <button
                    type="submit"
                    class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >Send</button
                >
            </form>
        </div>
    </div>
</body>

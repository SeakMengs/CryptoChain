<script>
    let isBlockchainValid = false;

    function verifyBlockchain() {
        // Add your blockchain verification logic here
        // For now, we'll just set isBlockchainValid to true
        isBlockchainValid = true;
    }
</script>

<body class="w-full pt-12 flex justify-center items-center dark:bg-gray-900">

<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
   <p class="px-2 max-w-lg text-3xl font-semibold leading-normal text-gray-900 dark:text-white py-7">Home Page</p>
   <div class="px-2">
   <button type="button" on:click={verifyBlockchain} class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Verify Blockchain</button>
   
   {#if isBlockchainValid}
   <div class="flex items-center space-x-2 py-3">
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6 text-green-500">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
       </svg>
       <span class= " text-center text-gray-500 dark:text-gray-400">Blockchain is valid</span>
   </div>
   {/if}
   </div>
        <table class="w-[1400px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <!-- <th scope="col" class="px-2 py-1">
                        index
                    </th> -->
                    <th scope="col" class="px-5 py-3">
                         timestamp
                    </th>
                    <th scope="col" class="px-5 py-3">
                        transactions
                    </th>
                    <!-- <th scope="col" class="px-6 py-3">
                        previousHash
                    </th>
                    <th scope="col" class="px-6 py-3">
                        hash
                    </th> -->
                    <th scope="col" class="px-5 py-3">
                        nonce
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        1
                    </td>
                    <td class="px-6 py-4">
                        Silver
                    </td>
                   
                    
                    
                     <td class="px-6 py-4">
                       dwad
                    </td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        2
                    </td>
                    <td class="px-6 py-4">
                        White
                    </td>
                    <td class="px-6 py-4">
                        Laptop PC
                    </td>
                 
                </tr>
                <tr class="bg-white dark:bg-gray-800">
                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                       3
                    </td>
                    <td class="px-6 py-4">
                        Black
                    </td>
                    <td class="px-6 py-4">
                        Accessories
                    </td>
                 
                </tr>
            </tbody>
        </table>
    </div>
    </body>

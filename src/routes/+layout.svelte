<script lang="ts">
    import { page } from "$app/stores";
    import "../app.css";
</script>

<header class="container mx-auto">
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
        <div class="flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
                <div
                    class="w-12 h-12 text-3xl font-bold text-white bg-yellow-500 rounded-full grid place-items-center"
                >
                    Y
                </div>
                <span
                    class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
                    >YatoCoin</span
                >
            </a>
            <div class="hidden w-full md:block md:w-auto" id="navbar-default">
                <ul
                    class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
                >
                    <li
                        class={$page.url.pathname == "/"
                            ? " text-yellow-500"
                            : "text-white"}
                    >
                        <a
                            href="/"
                            class="block py-2 px-3 transition-all hover:text-yellow-500"
                            >Blocks</a
                        >
                    </li>
                    <li
                        class={$page.url.pathname == "/transactions"
                            ? " text-yellow-500"
                            : "text-white"}
                    >
                        <a
                            href="/transactions"
                            class="block py-2 px-3 transition-all hover:text-yellow-500"
                            >Transactions</a
                        >
                    </li>
                    <li
                        class={$page.url.pathname == "/wallets"
                            ? " text-yellow-500"
                            : "text-white"}
                    >
                        <a
                            href="/wallets"
                            class="block py-2 px-3 transition-all hover:text-yellow-500"
                            >Wallets</a
                        >
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</header>
<body class="dark:bg-gray-900"> </body>
<slot />

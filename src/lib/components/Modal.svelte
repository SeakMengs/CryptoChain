<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let className: string = "";

    const dispatch = createEventDispatcher();

    function onClose() {
        dispatch("close");
    }
</script>

<div
    class="fixed top-0 left-0 w-screen h-screen z-[100] grid place-items-center"
>
    <button
        on:click={onClose}
        class=" fixed top-0 left-0 h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10
    "
    ></button>
    <div
        class={"z-[101] relative rounded-md bg-gray-800 p-4 border border-gray-500 text-white " +
            className}
    >
        <slot />
        <button class="absolute top-0 right-0 m-4" on:click={onClose}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-x w-6 stroke-bodydark2"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M18 6l-12 12" />
                <path d="M6 6l12 12" />
            </svg>
        </button>
    </div>
</div>

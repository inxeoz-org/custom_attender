<script>
    // Import global CSS once
    import "../app.css";
    import { user_logged_in } from "@src/store.js";
    import LoadingPage from "./LoadingPage.svelte";
    import { goto } from "$app/navigation";

    let loading = true;
    let darkMode = false;

    import {
        Breadcrumb,
        Button,
        Navbar,
        NavHamburger,
        NavBrand,
        NavUl,
        NavLi,
    } from "flowbite-svelte";

    // Import Toaster once (global notifications)
    import { Toaster } from "svelte-sonner";
    import { onMount } from "svelte";


    onMount(() => {
        loading = false;
        // Check for saved theme preference or default to light mode
        const savedTheme = localStorage.getItem('theme');
        darkMode = savedTheme === 'dark';
        updateTheme();
    });

    function toggleDarkMode() {
        darkMode = !darkMode;
        updateTheme();
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }

    function updateTheme() {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }
</script>

{#if loading}
    <LoadingPage />
{:else}
    <Navbar class="bg-sky-100 dark:bg-primary-700">
        <NavBrand href="/" aria-label="Homepage">
            <span
                class="self-center font-bold whitespace-nowrap dark:text-white"
            >
                Darshan Mahakaal
            </span>
        </NavBrand>

        <NavUl role="navigation" aria-label="Main navigation">
            <NavLi href="/">Home</NavLi>

            {#if $user_logged_in}
                <NavLi href="/dashboard">Dashboard</NavLi>
                <NavLi href="/dashboard/profile">Profile</NavLi>
            {:else}

                <NavLi href="/login">Login</NavLi>
            {/if}
        </NavUl>

        <NavHamburger aria-label="Toggle menu" />

        <!-- Theme Toggle -->
        <Button
            outline
            pill
            color="transparent"
            class="mr-2 px-3 py-1 text-sm"
            onclick={toggleDarkMode}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
            {#if darkMode}
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
            {:else}
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                </svg>
            {/if}
        </Button>

        <div class="flex items-center gap-2">
            {#if $user_logged_in}
                <Button
                    outline
                    pill
                    color="transparent"
                    class="px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600"
                    onclick={() => window.history.back()}
                    aria-label="Go back"
                >
                    Back
                </Button>

                <Button
                    outline
                    pill
                    color="transparent"
                    class="px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600"
                    onclick={() => window.history.forward()}
                    aria-label="Go forward"
                >
                    Next
                </Button>

                <Button
                    outline
                    pill
                    color="red"
                    class="px-3 py-1 text-sm font-medium"
                    onclick={() => {
                        user_logged_in.set(false);
                        goto('/login');
                    }}
                    aria-label="Logout from application"
                >
                    Logout
                </Button>
            {/if}
        </div>
    </Navbar>

    <!-- 🧩 Every page will render inside this slot -->
    <slot />

    <!-- 🔔 Global toast notification container -->
    <Toaster position="top-right" richColors closeButton />
{/if}

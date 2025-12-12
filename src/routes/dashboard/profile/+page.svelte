<script lang="ts">
    import { onMount } from "svelte";
    import { Card, Avatar, Badge, Button } from "flowbite-svelte";
    import { getProfile } from "@src/api.js";
    import { goto } from "$app/navigation";

    let profile: any = null;
    let error: string | null = null;
    let loading = true;

    const truthyInt = (v: any) => Number(v) === 1;

    onMount(async () => {
        try {
            profile = await getProfile();
        } catch (e) {
            error = "Failed to load profile";
            console.error(e);
        } finally {
            loading = false;
        }
    });

    function updateProfile() {
        // navigate to update page (keeps original behavior)
        goto("/dashboard/profile/update_profile");
    }
</script>

<div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4"
>
    {#if loading}
        <div class="animate-pulse text-gray-600 text-lg">
            Loading profile...
        </div>
    {:else if error}
        <div
            class="text-red-600 bg-red-100 border border-red-300 px-4 py-3 rounded-lg shadow-sm"
        >
            {error}
        </div>
    {:else if profile}
        <div class="max-w-4xl mx-auto">
            <Card
                class="card w-full p-8 bg-white shadow-xl rounded-3xl transition-transform transform hover:scale-[1.01] hover:shadow-2xl"
            >
                <div class="text-center mb-8">
                    <div class="relative inline-block">
                        <Avatar
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(profile.attender_name ?? profile.owner ?? "User")}&background=random`}
                            alt="Profile Avatar"
                            size="xl"
                            cornerStyle="rounded"
                            class="ring-4 ring-blue-100"
                        />
                        <div
                            class="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium"
                        >
                            Active
                        </div>
                    </div>
                    <div class="mt-4">
                        <h1 class="text-3xl font-bold text-gray-800 mb-2">
                            {profile.attender_name ??
                                profile.owner ??
                                profile.name}
                        </h1>
                        <p class="text-gray-600 text-lg">
                            {profile.doctype ?? "Darshan Attender"}
                        </p>
                        <Badge color="indigo" class="mt-3 text-sm px-3 py-1"
                            >Verified Attender</Badge
                        >
                    </div>
                </div>

                <div class="mt-6 space-y-4 text-gray-700">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div
                            class="flex items-center p-3 bg-gray-50 rounded-lg"
                        >
                            <div class="flex-shrink-0 mr-3">
                                <svg
                                    class="w-5 h-5 text-blue-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                    ></path>
                                </svg>
                            </div>
                            <div class="flex-1">
                                <div class="text-sm font-medium text-gray-500">
                                    Phone
                                </div>
                                <div class="text-sm text-gray-900">
                                    {profile.phone ?? "—"}
                                </div>
                            </div>
                        </div>

                        <div
                            class="flex items-center p-3 bg-gray-50 rounded-lg"
                        >
                            <div class="flex-shrink-0 mr-3">
                                <svg
                                    class="w-5 h-5 text-green-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    ></path>
                                </svg>
                            </div>
                            <div class="flex-1">
                                <div class="text-sm font-medium text-gray-500">
                                    Email
                                </div>
                                <div class="text-sm text-gray-900">
                                    {profile.email ??
                                        profile.frappe_profile ??
                                        "—"}
                                </div>
                            </div>
                        </div>

                        <div
                            class="flex items-center p-3 bg-gray-50 rounded-lg"
                        >
                            <div class="flex-shrink-0 mr-3">
                                <svg
                                    class="w-5 h-5 text-purple-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    ></path>
                                </svg>
                            </div>
                            <div class="flex-1">
                                <div class="text-sm font-medium text-gray-500">
                                    Gender
                                </div>
                                <div class="text-sm text-gray-900 capitalize">
                                    {profile.gender ?? "—"}
                                </div>
                            </div>
                        </div>

                        <div
                            class="flex items-center p-3 bg-gray-50 rounded-lg"
                        >
                            <div class="flex-shrink-0 mr-3">
                                <svg
                                    class="w-5 h-5 text-pink-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    ></path>
                                </svg>
                            </div>
                            <div class="flex-1">
                                <div class="text-sm font-medium text-gray-500">
                                    Date of Birth
                                </div>
                                <div class="text-sm text-gray-900">
                                    {profile.dob
                                        ? new Date(
                                              profile.dob,
                                          ).toLocaleDateString()
                                        : "—"}
                                </div>
                            </div>
                        </div>

                        <div
                            class="flex items-center p-3 bg-gray-50 rounded-lg"
                        >
                            <div class="flex-shrink-0 mr-3">
                                <svg
                                    class="w-5 h-5 text-orange-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    ></path>
                                </svg>
                            </div>
                        </div>

                        <div
                            class="flex items-center p-3 bg-gray-50 rounded-lg"
                        >
                            <div class="flex-shrink-0 mr-3">
                                <svg
                                    class="w-5 h-5 text-indigo-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    ></path>
                                </svg>
                            </div>
                            <div class="flex-1"></div>

                            <div
                                class="flex items-center p-3 bg-gray-50 rounded-lg md:col-span-2"
                            >
                                <div class="flex-shrink-0 mr-3">
                                    <svg
                                        class="w-5 h-5 text-red-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                        ></path>
                                    </svg>
                                </div>
                                <div class="flex-1">
                                    <div
                                        class="text-sm font-medium text-gray-500"
                                    >
                                        Aadhar Number
                                    </div>
                                    <div
                                        class="text-sm text-gray-900 font-mono"
                                    >
                                        {profile.aadhar ?? "—"}
                                    </div>
                                </div>
                            </div>

                            <div
                                class="flex items-center p-3 bg-gray-50 rounded-lg md:col-span-2"
                            >
                                <div class="flex-shrink-0 mr-3">
                                    <svg
                                        class="w-5 h-5 text-teal-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        ></path>
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        ></path>
                                    </svg>
                                </div>
                                <div class="flex-1">
                                    <div
                                        class="text-sm font-medium text-gray-500"
                                    >
                                        Address
                                    </div>
                                    <div class="text-sm text-gray-900">
                                        {profile.location ?? "—"}
                                    </div>
                                </div>
                            </div>

                            <div
                                class="flex items-center p-3 bg-gray-50 rounded-lg md:col-span-2"
                            >
                                <div class="flex-shrink-0 mr-3">
                                    <svg
                                        class="w-5 h-5 text-gray-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        ></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mt-8 flex justify-center space-x-4">
                        <Button
                            color="light"
                            class="rounded-full px-5 py-2 font-medium"
                            onclick={() => updateProfile()}
                        >
                            Update Profile
                        </Button>
                    </div>
                </div></Card
            >
        </div>
    {:else}
        <p class="text-gray-600">No profile found.</p>
    {/if}
</div>

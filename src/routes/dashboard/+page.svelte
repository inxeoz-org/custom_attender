<script lang="ts">
    import { onMount } from "svelte";
    import type { Appointment } from "@src/app.js";
    import { getAppointmentList, getAppointmentStats } from "@src/api.js";
    import ShowAppointment from "../ShowAppointment.svelte";
    import { list } from "postcss";

    let marked_exit_schedules = 0;
    let total_schedules = 0;

    let stats = { assigned: 0, exit: 0, attended: 0 };
    let appointments: Appointment[] = [];

    let showModal = false;
    let selected_appointment_id: string = "";
    function openModal(appointment: Appointment) {
        selected_appointment_id = appointment.name;

        showModal = true;
    }

    function closeModal() {
        showModal = false;
    }

    onMount(async () => {
        const list_data = await getAppointmentList(null);
        const stats_data = await getAppointmentStats(null);

        if (list_data?.message) {
            appointments = list_data.message;
        }

        if (stats_data?.message) {
            total_schedules = stats_data.message.total_appointments;
            marked_exit_schedules = stats_data.message.completed_appointments;
        }
    });
</script>

    <main class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8" role="main" aria-label="Darshan Attender Dashboard">
        <div class="max-w-7xl mx-auto">
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
            <header class="px-8 py-6 border-b">
                <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-800" id="dashboard-heading">
                    Darshan Attender Console
                </h1>
                <p class="mt-2 text-sm text-slate-600" aria-describedby="dashboard-heading">Welcome back, attender</p>
            </header>

            <main class="bg-amber-50 p-8">
                <!-- Stats -->
                <section class="grid gap-6 grid-cols-1 sm:grid-cols-3 mb-8" aria-label="Today's Statistics">
                    <div class="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-md border border-blue-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <div class="text-sm font-medium text-blue-600 uppercase tracking-wide">
                                    Active Assignments
                                </div>
                                <div class="mt-2 text-3xl font-bold text-blue-800">
                                    {total_schedules - marked_exit_schedules}
                                </div>
                                <div class="text-xs text-blue-600 mt-1">
                                    Currently managing
                                </div>
                            </div>
                            <div class="bg-blue-500 rounded-full p-3">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div class="relative bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 shadow-md border border-green-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <div class="text-sm font-medium text-green-600 uppercase tracking-wide">
                                    Completed Today
                                </div>
                                <div class="mt-2 text-3xl font-bold text-green-800">
                                    {marked_exit_schedules}
                                </div>
                                <div class="text-xs text-green-600 mt-1">
                                    Devotees served
                                </div>
                            </div>
                            <div class="bg-green-500 rounded-full p-3">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div class="relative bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 shadow-md border border-slate-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <div class="text-sm font-medium text-slate-600 uppercase tracking-wide">
                                    Total Today
                                </div>
                                <div class="mt-2 text-3xl font-bold text-slate-800">
                                    {total_schedules}
                                </div>
                                <div class="text-xs text-slate-600 mt-1">
                                    All appointments
                                </div>
                            </div>
                            <div class="bg-slate-500 rounded-full p-3">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Devotees -->
                <section aria-labelledby="devotees-heading">
                    <div class="flex items-center justify-between mb-4">
                        <h3 id="devotees-heading" class="text-slate-800 font-semibold text-lg">
                            Active Assigned Devotees
                        </h3>
                        <span class="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full" aria-label="{appointments.length} active devotees">
                            {appointments.length} active
                        </span>
                    </div>

                    <div class="bg-white rounded-lg shadow overflow-hidden">
                        <div
                            class="hidden md:grid grid-cols-6 gap-0 bg-slate-100 text-slate-700 text-sm font-semibold px-4 py-3 border-b"
                            role="row"
                        >
                            <div role="columnheader">Booking ID</div>
                            <div role="columnheader">Darshan Type</div>
                            <div role="columnheader">Group Size</div>
                            <div role="columnheader">Primary Devotee</div>
                            <div role="columnheader">Date</div>
                            <div role="columnheader" class="text-center">Actions</div>
                        </div>

                        <div class="divide-y">
                            {#if appointments.length === 0}
                                <div
                                    class="px-6 py-8 text-center text-slate-500"
                                >
                                    No assigned devotees for today.
                                </div>
                            {/if}

                             {#each appointments as a}
                                 <div
                                     class="grid grid-cols-1 md:grid-cols-6 items-center gap-3 px-4 py-4 md:px-6 hover:bg-gray-50 transition-colors"
                                     role="row"
                                 >
                                     <div class="text-blue-600 font-semibold text-sm md:text-base">
                                         {a.name}
                                     </div>

                                     <div class="text-gray-700 text-sm md:text-base">{a.slot}</div>
                                     <div class="text-gray-700 text-sm md:text-base">{a.group_size} Devotee(s)</div>
                                     <div class="text-gray-700 text-sm md:text-base">{a.primary_devotee || 'N/A'}</div>
                                     <div class="text-gray-700 text-sm md:text-base">{new Date(a.date).toLocaleDateString()}</div>
                                     <div class="flex justify-end">
                                         <button
                                             class="px-3 py-2 md:px-4 md:py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 shadow-sm text-xs md:text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                             on:click={() => openModal(a)}
                                             aria-label="View details for booking {a.name}"
                                         >
                                             <span class="hidden sm:inline">View Details</span>
                                             <span class="sm:hidden">View</span>
                                         </button>
                                     </div>
                                 </div>
                             {/each}
                        </div>
                    </div>

                     <div class="mt-6 flex justify-center">
                         <button
                             class="px-6 py-3 rounded-lg bg-red-500 text-white hover:bg-red-600 shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                             on:click={() => {
                                 // Add logout logic here
                                 user_logged_in.set(false);
                                 auth_token.set('');
                                 goto('/login');
                             }}
                             aria-label="Logout from the application"
                         >
                             <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                             </svg>
                             Logout
                         </button>
                     </div>
                </section>
             </main>
         </div>
     </main>

{#if showModal}<ShowAppointment
        on:close={closeModal}
        appointmentId={selected_appointment_id}
    />
{/if}

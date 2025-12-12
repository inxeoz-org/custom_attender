<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { Card, Button, Label, Input } from "flowbite-svelte";
    import { Badge } from "flowbite-svelte";

    import { user_logged_in, auth_token } from "@src/store.js";

    import { loginCheck, verifyOtpLogin } from "@src/api.js";
    import { toast } from "svelte-sonner";

    // phone as string to allow leading + / 0 etc
    export let phone = "";
    let otp: string = "";
    let loading: boolean = false;
    let otpSent: boolean = false;
    let otpLoading: boolean = false;

    // Form validation
    let phoneError: string = "";
    let otpError: string = "";

    // Focus management
    let phoneInput: HTMLInputElement;
    let otpInput: HTMLInputElement;

    function validatePhone(): boolean {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phone.trim()) {
            phoneError = "Phone number is required";
            return false;
        }
        if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
            phoneError = "Please enter a valid phone number";
            return false;
        }
        phoneError = "";
        return true;
    }

    async function sendOtp() {
        if (!validatePhone()) {
            phoneInput?.focus();
            return;
        }

        otpLoading = true;
        const result = await loginCheck(phone);

        if (result?.message) {
            otpSent = true;
            console.log(result?.message);
            toast.success("OTP sent to your phone");
            // Auto-focus OTP input after a short delay
            setTimeout(() => otpInput?.focus(), 100);
        } else {
            toast.error("Failed to send OTP: " + JSON.stringify(result));
        }

        otpLoading = false;
    }

    function validateOtp(): boolean {
        if (!otp.trim()) {
            otpError = "OTP is required";
            return false;
        }
        if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
            otpError = "Please enter a valid 6-digit OTP";
            return false;
        }
        otpError = "";
        return true;
    }

    async function verifyOtp(e: SubmitEvent) {
        e?.preventDefault();

        if (!validateOtp()) {
            otpInput?.focus();
            return;
        }

        loading = true;

        const result = await verifyOtpLogin(phone, otp);

        if (result?.message) {
            // Save the token
            auth_token.set(result.message);
            user_logged_in.set(true);
            toast.success("Login successful");
            await goto("/dashboard");
        } else {
            otpError = "Invalid OTP. Please try again.";
            otpInput?.focus();
            loading = false;
        }
    }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <Card class="w-full max-w-md p-8 shadow-xl">
        {#if !otpSent}
            <!-- Phone Number Input -->
            <form
                class="space-y-4"
                on:submit|preventDefault={sendOtp}
                aria-busy={otpLoading}
                aria-labelledby="login-heading"
            >
                <div class="text-center">
                    <h2
                        id="login-heading"
                        class="text-2xl font-bold text-gray-800 mb-2"
                    >
                        Welcome Back
                    </h2>
                    <p class="text-gray-600 text-sm">Enter your phone number to continue</p>
                </div>

                <Badge color="indigo" class="mx-auto w-fit">Attender Portal</Badge>

                <div>
                    <Label for="phone">Phone Number</Label>
                    <Input
                        bind:this={phoneInput}
                        id="phone"
                        type="tel"
                        bind:value={phone}
                        placeholder="Enter phone number"
                        inputmode="tel"
                        autocomplete="tel"
                        required
                        class:error={phoneError}
                        aria-describedby={phoneError ? "phone-error" : undefined}
                        on:input={() => { if (phoneError) phoneError = ""; }}
                    />
                    {#if phoneError}
                        <p id="phone-error" class="mt-1 text-sm text-red-600">{phoneError}</p>
                    {/if}
                </div>

                <div class="flex items-center justify-center">
                    <Button
                        type="submit"
                        disabled={otpLoading}
                        aria-disabled={otpLoading}
                    >
                        {#if otpLoading}
                            <svg class="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                            </svg>
                            Sending OTP...
                        {:else}
                            Send OTP
                        {/if}
                    </Button>
                </div>
            </form>
        {:else}
            <!-- OTP Verification -->
            <form class="space-y-4" on:submit={verifyOtp} aria-busy={loading} aria-labelledby="otp-heading">
                <div class="text-center">
                    <h2
                        id="otp-heading"
                        class="text-2xl font-bold text-gray-800 mb-2"
                    >
                        Verify Your Identity
                    </h2>
                    <p class="text-gray-600 text-sm">Enter the 6-digit code sent to your phone</p>
                </div>

                <Badge color="indigo" class="mx-auto w-fit">Attender Portal</Badge>

                <div>
                    <Label for="otp">Enter OTP</Label>
                    <Input
                        bind:this={otpInput}
                        id="otp"
                        type="text"
                        bind:value={otp}
                        placeholder="Enter 6-digit OTP"
                        inputmode="numeric"
                        maxlength="6"
                        required
                        class:error={otpError}
                        aria-describedby={otpError ? "otp-error" : undefined}
                        on:input={() => { if (otpError) otpError = ""; }}
                    />
                    {#if otpError}
                        <p id="otp-error" class="mt-1 text-sm text-red-600">{otpError}</p>
                    {/if}
                    <p class="text-sm text-gray-600 mt-1">
                        OTP sent to: {phone}
                    </p>
                </div>

                <div class="flex items-center justify-center space-x-2 mb-4">
                    <Button
                        type="button"
                        color="light"
                        on:click={() => {
                            otpSent = false;
                            otp = "";
                            loading = false;
                            otpLoading = false;
                        }}
                    >
                        Back
                    </Button>
                    <Button
                        type="button"
                        color="outline"
                        disabled={otpLoading}
                        on:click={sendOtp}
                        aria-describedby="resend-help"
                    >
                        {#if otpLoading}
                            <svg class="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                            </svg>
                            Sending...
                        {:else}
                            Resend OTP
                        {/if}
                    </Button>
                    <p id="resend-help" class="sr-only">Resend the OTP to your phone number</p>
                </div>

                <div class="flex items-center justify-center">
                    <Button
                        type="submit"
                        disabled={loading}
                        aria-disabled={loading}
                    >
                        {#if loading}
                            <svg class="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                            </svg>
                            Verifying...
                        {:else}
                            Verify OTP
                        {/if}
                    </Button>
                </div>
            </form>
        {/if}
    </Card>
</div>

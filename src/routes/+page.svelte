<script>
    import { goto } from "$app/navigation";

    // No script needed for this static background
</script>

<div class="background" aria-hidden="true">
    <svg
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
    >
        <defs>
            <filter id="noise" x="0" y="0" width="100%" height="100%">
                <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.8"
                    numOctaves="4"
                    stitchTiles="stitch"
                    result="turbulence"
                />
                <feColorMatrix
                    in="turbulence"
                    type="saturate"
                    values="0"
                    result="desaturatedNoise"
                />
                <feComponentTransfer in="desaturatedNoise" result="noiseAlpha">
                    <feFuncA type="table" tableValues="0 0.2 0.8 1" />
                </feComponentTransfer>
                <feComposite
                    in="noiseAlpha"
                    in2="SourceGraphic"
                    operator="over"
                />
            </filter>
        </defs>

        <rect width="100%" height="100%" fill="#edf6f9" />
        <rect width="100%" height="100%" filter="url(#noise)" opacity="0.15" />
    </svg>
</div>

<main
    class="centered-content"
    role="main"
    aria-label="Mahakal Darshan Attender Welcome Page"
>
    <div class="text-content">
        <h1 class="centered-text animate-fade-in">महाकाल दर्शन</h1>
        <p class="subtitle animate-fade-in-delay">Attender Portal</p>
        <p class="description animate-fade-in-delay-2">
            Manage devotee appointments with care and devotion
        </p>
    </div>
    <div class="button-group animate-fade-in-delay-3">
        <button
            type="button"
            on:click={() => goto("/login")}
            class="login-btn"
            aria-describedby="login-description"
        >
            <span>Login</span>
            <svg
                class="arrow-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                ></path>
            </svg>
        </button>
        <div id="login-description" class="sr-only">
            Click to access the attender login portal
        </div>
    </div>
</main>

<style>
    :global(html, body, #svelte) {
        margin: 0;
        height: 100%;
        width: 100%;
    }
    .background {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        overflow: hidden;
        z-index: -1;
    }

    .centered-content {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-family: "Georgia", serif;
        color: #7a5c2e;
        user-select: none;
        text-align: center;
        max-width: 90vw;
        width: 100%;
    }

    .text-content {
        margin-bottom: 3rem;
    }

    .centered-text {
        font-size: clamp(2.5rem, 8vw, 5rem);
        font-weight: 300;
        letter-spacing: 0.1em;
        margin-bottom: 1rem;
        line-height: 1.2;
        pointer-events: none;
    }

    .subtitle {
        font-size: clamp(1.2rem, 3vw, 1.8rem);
        font-weight: 400;
        margin-bottom: 1.5rem;
        opacity: 0.9;
    }

    .description {
        font-size: clamp(0.9rem, 2vw, 1.1rem);
        font-weight: 300;
        opacity: 0.8;
        max-width: 400px;
        margin: 0 auto;
        line-height: 1.6;
    }

    .button-group {
        pointer-events: auto;
        display: flex;
        gap: 1.5rem;
        justify-content: center;
    }

    .login-btn {
        font-family: "Georgia", serif;
        font-size: 1.2rem;
        font-weight: 500;
        padding: 1rem 2.5rem;
        border: 2px solid #7a5c2e;
        background-color: transparent;
        color: #7a5c2e;
        cursor: pointer;
        border-radius: 50px;
        transition: all 0.3s ease;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        position: relative;
        overflow: hidden;
    }

    .login-btn::before {
        content: "";
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
        );
        transition: left 0.5s;
    }

    .login-btn:hover::before {
        left: 100%;
    }

    .login-btn:hover {
        background-color: #7a5c2e;
        color: #edf6f9;
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(122, 92, 46, 0.3);
    }

    .arrow-icon {
        width: 1.2rem;
        height: 1.2rem;
        transition: transform 0.3s ease;
    }

    .login-btn:hover .arrow-icon {
        transform: translateX(3px);
    }

    /* Animations */
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .animate-fade-in {
        animation: fadeIn 1s ease-out forwards;
    }

    .animate-fade-in-delay {
        animation: fadeIn 1s ease-out 0.3s forwards;
        opacity: 0;
    }

    .animate-fade-in-delay-2 {
        animation: fadeIn 1s ease-out 0.6s forwards;
        opacity: 0;
    }

    .animate-fade-in-delay-3 {
        animation: fadeIn 1s ease-out 0.9s forwards;
        opacity: 0;
    }

    /* Accessibility */
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }

    /* Focus management */
    .login-btn:focus {
        outline: 2px solid #7a5c2e;
        outline-offset: 4px;
    }

    /* Mobile responsiveness */
    @media (max-width: 768px) {
        .centered-content {
            padding: 2rem;
        }

        .text-content {
            margin-bottom: 2rem;
        }

        .centered-text {
            font-size: 3rem;
        }

        .login-btn {
            font-size: 1.1rem;
            padding: 0.9rem 2rem;
        }
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
        .animate-fade-in,
        .animate-fade-in-delay,
        .animate-fade-in-delay-2,
        .animate-fade-in-delay-3 {
            animation: none;
        }

        .login-btn:hover {
            transform: none;
        }
    }
</style>

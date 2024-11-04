<script lang="ts">

	async function handleGoogleLogin() {
		window.location.href = 'http://localhost:8080/auth/google';
	}
</script>

<div class="flex flex-col min-h-screen items-center justify-center ">
    <button class="flex flex-row items-center justify-center gap-4 border border-black-300 rounded-lg p-4 shadow-lg hover:scale-105 transition-all duration-200" onclick={handleGoogleLogin}>
        <img src="/google.png" alt="Google Logo" class="w-10 h-10">
        <h1>Login With Google</h1>
    </button>
</div>
 
<script lang="ts">
	async function handleGoogleLogin() {
		window.location.href = 'http://localhost:8080/auth/google';
	}
</script>

<div class="flex min-h-screen flex-col items-center justify-center">
	<button
		class="border-black-300 flex flex-row items-center justify-center gap-4 rounded-lg border p-4 shadow-lg transition-all duration-200 hover:scale-105"
		onclick={handleGoogleLogin}
	>
		<img src="/google.png" alt="Google Logo" class="h-10 w-10" />
		<h1>Login With Google</h1>
	</button>
</div>

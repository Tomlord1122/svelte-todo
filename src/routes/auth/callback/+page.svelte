<script lang="ts">
	import { goto } from '$app/navigation';
	import { writable } from 'svelte/store';
	interface User {
		id: string;
		username: string;
		email: string;
		accessToken: string;
	}

	function createAuthStore() {
		const { subscribe, set } = writable<User | null>(null);

		return {
			subscribe,
			login: (user: User) => {
				set(user);
				const cookieString = `auth_token=${user.accessToken}; path=/; domain=localhost; max-age=86400; SameSite=None`;
				document.cookie = cookieString;
			},
			logout: () => {
				set(null);
				const cookieString = 'auth_token=; path=/; max-age=0; SameSite=None';
				console.log('Deleting cookie:', cookieString);
				document.cookie = cookieString;
			}
		};
	}

	const auth = createAuthStore();

	$effect(() => {
		try {
			const param = new URLSearchParams(window.location.search);
			const user = {
				id: param.get('id') || '',
				username: param.get('username') || '',
				email: param.get('email') || '',
				accessToken: param.get('access_token') || ''
			};

			auth.login(user);
			goto(`/todos/${user.id}`);
		} catch (error) {
			console.error('Error during authentication:', error);
		}
	});
</script>

<div class="flex min-h-screen items-center justify-center">
	<h1 class="text-2xl font-bold">Authenticating...</h1>
</div>

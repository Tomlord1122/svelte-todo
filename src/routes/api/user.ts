import type { User } from '$lib/utils/type.js';
import { PUBLIC_BACKEND_URL } from '$env/static/public';

export async function createUser(user: User): Promise<User> {
	const response = await fetch(`${PUBLIC_BACKEND_URL}/user/${user.name}/${user.email}/${user.id}`);
	return response.json();
}

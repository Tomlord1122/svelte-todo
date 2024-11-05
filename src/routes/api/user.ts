import type { User } from '$lib/types/type.js';

export async function createUser(user: User): Promise<User> {
	const response = await fetch(`http://localhost:8080/user/${user.name}/${user.email}/${user.id}`);
	return response.json();
}

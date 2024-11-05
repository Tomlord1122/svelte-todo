import type { TodoItem, CreateTodoInput, UpdateTodoInput } from '$lib/utils/type.js';
import { PUBLIC_BACKEND_URL } from '$env/static/public';
const API_BASE = PUBLIC_BACKEND_URL + '/api';

async function fetchWithAuth(url: string, options: RequestInit = {}) {
	const response = await fetch(url, {
		...options,
		credentials: 'include', // This is necessary for the cookie to be sent
		headers: {
			'Content-Type': 'application/json',
			...options.headers
		}
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	return response;
}

export async function getTodos(): Promise<TodoItem[]> {
	const response = await fetchWithAuth(`${API_BASE}/todos`);
	return response.json();
}

export async function createTodo(todo: CreateTodoInput): Promise<TodoItem> {
	const response = await fetchWithAuth(`${API_BASE}/todos`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(todo)
	});

	if (!response.ok) {
		throw new Error('Failed to create todo');
	}

	return response.json();
}

export async function updateTodo(id: string, todo: UpdateTodoInput): Promise<TodoItem> {
	const response = await fetchWithAuth(`${API_BASE}/todos/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(todo)
	});
	return response.json();
}

export async function deleteTodo(id: string): Promise<void> {
	await fetchWithAuth(`${API_BASE}/todos/${id}`, {
		method: 'DELETE'
	});
}

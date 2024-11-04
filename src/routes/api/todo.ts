import type { TodoItem } from '$lib/types/type.ts'

const API_BASE = 'http://localhost:8080/api';

async function fetchWithAuth(url: string, options: RequestInit = {}) {


    const response = await fetch(url, {
        ...options,
        credentials: 'include', // This is necessary for the cookie to be sent
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
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

export async function createTodo(todo: Omit<TodoItem, 'id'>): Promise<TodoItem> {
    const response = await fetchWithAuth(`${API_BASE}/todos`, {
        method: 'POST',
        body: JSON.stringify(todo),
    });
    return response.json();
}

export async function updateTodo(id: string, todo: Partial<TodoItem>): Promise<TodoItem> {
    const response = await fetchWithAuth(`${API_BASE}/todos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(todo),
    });
    return response.json();
}

export async function deleteTodo(id: string): Promise<void> {
    await fetchWithAuth(`${API_BASE}/todos/${id}`, {
        method: 'DELETE',
    });
}
export type TodoItem = {
    id: number;
    task: string;
    award: string;
    completed: boolean;
    targetCount: number;
    currentCount: number;
    percentage: number;
    showCompletionAnimation: boolean;
}

export interface User {
    id: string;
    email: string;
    name: string;
    todos: TodoItem[];
}

export interface AuthState{
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
}




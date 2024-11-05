
export interface User {
    id: number;
    email: string;
    name: string;
    todos: TodoItem[];
}

export interface AuthState{
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
}



export interface CreateTodoInput {
    task: string;
    award: string;
    completed: boolean;
    targetCount: number;
    currentCount: number;
    percentage: number;
    showCompletionAnimation: boolean;
}

export interface TodoItem extends CreateTodoInput {
    id?: string;
    userID: number;
}
export interface User {
	id: number;
	email: string;
	name: string;
	todos: TodoItem[];
}

export interface AuthState {
	isAuthenticated: boolean;
	user: User | null;
	token: string | null;
}

export interface CreateTodoInput {
	Task: string;
	Award: string;
	Completed: boolean;
	TargetCount: number;
	CurrentCount: number;
	Percentage: number;
	ShowCompletionAnimation: boolean;
}

export interface UpdateTodoInput {
	id: string;
	Completed: boolean;
	TargetCount: number;
	CurrentCount: number;
	Percentage: number;
	ShowCompletionAnimation: boolean;
}

export interface DeleteTodoInput {
	id: string;
}

export interface TodoItem extends CreateTodoInput {
	ID?: string;
	UserID: number;
}

export interface User {
	name: string;
	email: string;
	id: string;
}

export interface AuthState {
	isAuthenticated: boolean;
	user: User | null;
} 
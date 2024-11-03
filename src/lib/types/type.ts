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
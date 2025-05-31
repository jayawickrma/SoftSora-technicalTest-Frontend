export interface TaskModel {
    id: string;
    title: string;
    description?: string;
    dueDate?: string;
    status: "pending" | "in-progress" | "completed";
    createdAt: string;
}

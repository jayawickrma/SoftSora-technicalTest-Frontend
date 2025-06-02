export interface TaskModel {
    title: string;
    description: string;
    priority: string;
    status: "pending" | "in-progress" | "completed";
    dueDate:string;
    createdAt: string;
}

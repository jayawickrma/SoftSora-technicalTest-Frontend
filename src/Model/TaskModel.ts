export class TaskModel {
    taskId:string
    title: string;
    description: string;
    priority: string;
    status: "pending" | "in-progress" | "completed";
    dueDate:string;
    createdAt: string;

    constructor(taskId: string, title: string, description: string, priority: string, status: "pending" | "in-progress" | "completed", dueDate: string, createdAt: string) {
        this.taskId = taskId;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.status = status;
        this.dueDate = dueDate;
        this.createdAt = createdAt;
    }
}

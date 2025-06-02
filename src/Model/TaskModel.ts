export class TaskModel {
    id:number
    title: string;
    description: string;
    priority: string;
    status: "pending" | "in-progress" | "completed";
    dueDate:string;
    createdAt: string;

    constructor(id: number, title: string, description: string, priority: string, status: "pending" | "in-progress" | "completed", dueDate: string, createdAt: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.status = status;
        this.dueDate = dueDate;
        this.createdAt = createdAt;
    }
}

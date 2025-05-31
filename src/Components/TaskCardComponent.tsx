import type { TaskModel } from "../Model/TaskModel";
import "../CSS/taskCard.css";

interface TaskCardProps {
    task: TaskModel;
}

export function TaskCard({ task }: TaskCardProps) {
    return (
        <div className="task-card">
            <div className="task-card-header">
                <div className="task-card-details">
                    <h3 className="task-title">{task.title}</h3>
                    <p className="task-description">
                        {task.description || "No description provided."}
                    </p>
                    <p className="task-date">
                        <strong>Due:</strong> {task.dueDate || "No due date"}
                    </p>
                    <p className="task-date">
                        <strong>Created:</strong> {task.createdAt}
                    </p>
                    <p className="task-priority">
                        <strong>Priority:</strong> {task.priority}
                    </p>
                </div>
                <span className={`task-status ${task.status}`}>
                    {task.status}
                </span>
            </div>
        </div>
    );
}

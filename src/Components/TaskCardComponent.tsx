import type { TaskModel } from "../Model/TaskModel";
import "../CSS/TaskCard.css";

interface TaskCardProps {
    task: TaskModel;
    onEdit: (task: TaskModel) => void;
    onDelete?: (taskId: number) => void;
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
    const handleEdit = () => {
        onEdit(task);
    };

    const handleDelete = () => {
        if(onDelete) {
            onDelete(task.id);
        }
    };

    return (
        <div className={`task-card ${task.priority?.toLowerCase()}-priority`}>
            <div className="task-card-header">
                <div className="task-main">
                    <h3 className="task-title">{task.title}</h3>
                    <p className="task-description">
                        {task.description || "No description provided."}
                    </p>

                    <div className="task-info">
                        <p><strong>Created:</strong> {task.createdAt}</p>
                        <p><strong>Due:</strong> {task.dueDate || "No due date"}</p>
                        <p><strong>Priority:</strong> <span className="priority-chip">{task.priority}</span></p>
                    </div>
                </div>

                <div className="task-card-right">
                    <span className={`status-badge ${task.status?.toLowerCase().replace(/\s+/g, '-')}`}>
                        {task.status}
                    </span>
                    <div className="task-buttons">
                        <button className="task-btn edit" onClick={handleEdit}>✏️ Edit</button>
                        <button className="task-btn delete" onClick={handleDelete}>🗑️ Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

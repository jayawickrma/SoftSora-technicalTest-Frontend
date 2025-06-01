import type { TaskModel } from "../Model/TaskModel";

interface TaskCardProps {
    task: TaskModel;
    onEdit?: (task: TaskModel) => void;
}

export function TaskEditCard({ task, onEdit }: TaskCardProps) {
    return (
        <div className="task-card">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Priority: {task.priority}</p>
            <p>Status: {task.status}</p>
            <p>Due: {task.dueDate}</p>
            <button onClick={() => onEdit?.(task)}>Edit</button>
        </div>
    );
}

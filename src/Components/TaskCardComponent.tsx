import type { TaskModel } from "../Model/TaskModel";

interface TaskCardProps {
    task: TaskModel;
}

export function TaskCard({ task }: TaskCardProps) {
    return (
        <div className="bg-white shadow-md hover:shadow-xl transition-shadow duration-300 rounded-xl p-6 w-full max-w-md mx-auto">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {task.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                        {task.description || "No description provided."}
                    </p>
                    <p className="text-sm text-gray-500">
                        Due: <span className="font-medium">{task.dueDate || "No due date"}</span>
                    </p>
                </div>
                <span
                    className={`text-xs px-3 py-1 rounded-full font-semibold ${
                        task.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : task.status === "in-progress"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                    }`}
                >
          {task.status}
        </span>
            </div>
        </div>
    );
}

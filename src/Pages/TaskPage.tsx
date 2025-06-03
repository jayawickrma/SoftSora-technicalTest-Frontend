import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../Store/Store.ts";
import { TaskCard } from "../Components/TaskCardComponent";
import { TaskModal } from "../Components/TaskModalCOmponent.tsx";
import {
    addTask,
    updateTask,
    deleteTask,
    getAllTasksFromSignedInUser,
} from "../Slices/TaskSlice";
import type { TaskModel } from "../Model/TaskModel";
import Swal from "sweetalert2";
import "../CSS/TaskCard.css";

export function TaskPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { tasks, loading, error } = useSelector((state: RootState) => state.task);

    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editTask, setEditTask] = useState<TaskModel | null>(null);

    useEffect(() => {
        const mail = localStorage.getItem('user-email');
        if (mail) {
            dispatch(getAllTasksFromSignedInUser(mail));
        }
    }, [dispatch]);

    const filteredTasks = tasks
        .filter((task) =>
            task.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .filter((task) =>
            statusFilter === "all" ? true : task.status === statusFilter
        )
        .sort((a, b) => {
            const priorityOrder: Record<string, number> = {
                high: 1,
                medium: 2,
                low: 3,
            };
            const priorityDiff =
                (priorityOrder[a.priority.toLowerCase()] ?? 4) -
                (priorityOrder[b.priority.toLowerCase()] ?? 4);

            if (priorityDiff !== 0) return priorityDiff;

            return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        });

    const handleAddClick = () => {
        setEditTask(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (task: TaskModel) => {
        setEditTask(task);
        setIsModalOpen(true);
    };

    const handleDelete = async (taskId: string) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This task will be deleted permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            try {
                await dispatch(deleteTask(taskId)).unwrap();
                Swal.fire("Deleted!", "Task has been deleted.", "success");
            } catch (err) {
                Swal.fire("Error", typeof err === "string" ? err : "Failed to delete task", "error");
            }
        }
    };

    const handleModalSubmit = async (data: Omit<TaskModel, "taskId" | "createdAt">) => {
        if (editTask) {
            try {
                await dispatch(updateTask({ taskId: editTask.taskId, task: { ...editTask, ...data } })).unwrap();
                Swal.fire("Updated!", "Task updated successfully", "success");
            } catch (err) {
                Swal.fire("Error", typeof err === "string" ? err : "Failed to update task", "error");
            }
        } else {
            const now = new Date().toISOString();
            const newTask: TaskModel = {
                ...data,
                taskId: crypto.randomUUID(),
                createdAt: now,
            };
            try {
                await dispatch(addTask(newTask)).unwrap();
                Swal.fire("Added!", "Task added successfully", "success");
            } catch (err) {
                Swal.fire("Error", typeof err === "string" ? err : "Failed to add task", "error");
            }
        }
        setIsModalOpen(false);
    };


    return (
        <div className="container py-4">
            <div className="task-top-bar">
                <h2 className="mb-4">Manage Your Tasks</h2>
                <input
                    type="text"
                    placeholder="Search by title..."
                    className="search-bar"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <br /><br />
                <div className="task-header">
                    <div className="task-filters">
                        {["all", "pending", "in-progress", "completed"].map((status) => (
                            <button
                                key={status}
                                className={`status-btn ${statusFilter === status ? "active" : ""}`}
                                onClick={() => setStatusFilter(status)}
                            >
                                {status.toUpperCase().replace("-", "_")}
                            </button>
                        ))}
                    </div>
                    <button className="add-task-btn" onClick={handleAddClick}>Add Task</button>
                </div>
            </div>

            {loading ? (
                <p>Loading tasks...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                    // @ts-ignore
                    <TaskCard key={task.taskId} task={task} onEdit={handleEditClick} onDelete={handleDelete} />
                ))
            ) : (
                <p>No tasks found.</p>
            )}

            <TaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleModalSubmit}
                // @ts-ignore
                initialData={editTask ? { ...editTask, taskId: undefined, createdAt: undefined } as Omit<TaskModel, "taskId" | "createdAt"> : undefined}
                isEditMode={!!editTask}
            />
        </div>
    );
}

import { useState } from "react";
import type { TaskModel } from "../Model/TaskModel.ts";
import { TaskCard } from "../Components/TaskCardComponent.tsx";
import "../CSS/taskCard.css";

export const sampleTasks: TaskModel[] = [
    {
        id: 1,
        title: "Finish project report",
        priority: "high",
        description: "Complete the final draft of the quarterly report.",
        dueDate: "2025-06-05",
        status: "in-progress",
        createdAt: "2025-07-01",
    },
    {
        id: 2,
        title: "Team meeting",
        description: "Weekly sync-up with the product team.",
        dueDate: "2025-06-02",
        status: "pending",
        priority: "low",
        createdAt: "2025-06-31",
    },
    {
        id: 3,
        title: "Code review",
        description: "Review the latest PRs for the frontend module.",
        dueDate: "2025-06-01",
        status: "completed",
        priority: "medium",
        createdAt: "2025-06-25",
    },
];

export function TaskPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const priorityOrder: Record<string, number> = {
        high: 1,
        medium: 2,
        low: 3,
    };

    const filteredTasks = sampleTasks
        .filter((task) =>
            task.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            const priorityDiff =
                (priorityOrder[a.priority?.toLowerCase() || "low"] ?? 4) -
                (priorityOrder[b.priority?.toLowerCase() || "low"] ?? 4);

            if (priorityDiff !== 0) return priorityDiff;

            // If priority is the same, sort by due date
            return new Date(a.dueDate || "").getTime() - new Date(b.dueDate || "").getTime();
        });

    return (
        <div className="container py-4">
            <h2 className="mb-4">Manage Your Tasks</h2>

            {/* 🔍 Search bar */}
            <input
                type="text"
                placeholder="Search by title..."
                className="search-bar"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* 🧾 Sorted and filtered tasks */}
            {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))
            ) : (
                <p>No tasks found.</p>
            )}
        </div>
    );
}

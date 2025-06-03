import React, { useState, useEffect } from "react";
import type { TaskModel } from "../Model/TaskModel";
import '../CSS/TaskModal.css'

interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (task: Omit<TaskModel, "id">) => void;
    initialData?: Omit<TaskModel, "id">;
    isEditMode?: boolean;
}

export function TaskModal({
                              isOpen,
                              onClose,
                              onSubmit,
                              initialData,
                              isEditMode = false,
                          }: TaskModalProps) {
    const [formData, setFormData] = useState<Omit<TaskModel, "taskId">>({
        title: "",
        description: "",
        priority: "low",
        status: "pending",
        dueDate: "",
        createdAt: new Date().toISOString().split("T")[0],
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                title: "",
                description: "",
                priority: "low",
                status: "pending",
                dueDate: "",
                createdAt: new Date().toISOString().split("T")[0],
            });
        }
    }, [initialData, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        // @ts-ignore
        onSubmit(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>{isEditMode ? "Update Task" : "Add Task"}</h2>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                />
                <select name="priority" value={formData.priority} onChange={handleChange}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <select name="status" value={formData.status} onChange={handleChange}>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
                <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="createdAt"
                    value={formData.createdAt}
                    onChange={handleChange}
                />

                <div className="modal-actions">
                    <button onClick={handleSubmit}>{isEditMode ? "Update" : "Add"}</button>
                    <button className="cancel" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

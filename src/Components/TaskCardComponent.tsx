import React, { useState } from 'react';
import type { TaskModel } from "../Model/TaskModel";
import "../CSS/TaskCard.css";

interface TaskCardProps {
    task: TaskModel;
    onEdit: (task: TaskModel) => void;
    onDelete?: (taskId: string) => void;
}

interface TaskDetailModalProps {
    task: TaskModel;
    isOpen: boolean;
    onClose: () => void;
    onEdit: (task: TaskModel) => void;
    onDelete?: (taskId: string) => void;
}

function TaskDetailModal({ task, isOpen, onClose, onEdit, onDelete }: TaskDetailModalProps) {
    if (!isOpen) return null;

    const handleEdit = () => {
        onEdit(task);
        onClose();
    };

    const handleDelete = () => {
        if (onDelete) {
            onDelete(task.taskId);
            onClose();
        }
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="task-modal-overlay" onClick={handleOverlayClick}>
            <div className="task-modal">
                <div className="task-modal-header">
                    <h2 className="task-modal-title">{task.title}</h2>
                    <button className="task-modal-close" onClick={onClose}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <div className="task-modal-content">
                    <div className="task-modal-section">
                        <h3>Description</h3>
                        <p className="task-modal-description">
                            {task.description || "No description provided."}
                        </p>
                    </div>

                    <div className="task-modal-details">
                        <div className="task-detail-row">
                            <div className="task-detail-item">
                                <label>Status</label>
                                <span className={`status-badge-large ${task.status?.toLowerCase().replace(/\s+/g, '-')}`}>
                                    {task.status}
                                </span>
                            </div>
                            <div className="task-detail-item">
                                <label>Priority</label>
                                <span className={`priority-badge-large ${task.priority?.toLowerCase()}`}>
                                    {task.priority}
                                </span>
                            </div>
                        </div>

                        <div className="task-detail-row">
                            <div className="task-detail-item">
                                <label>Created Date</label>
                                <span className="task-date">{task.createdAt}</span>
                            </div>
                            <div className="task-detail-item">
                                <label>Due Date</label>
                                <span className="task-date">{task.dueDate || "No due date"}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="task-modal-actions">
                    <button className="task-modal-btn edit" onClick={handleEdit}>
                        Edit Task
                    </button>
                    <button className="task-modal-btn delete" onClick={handleDelete}>
                        Delete Task
                    </button>
                    <button className="task-modal-btn cancel" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        onEdit(task);
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onDelete) {
            onDelete(task.taskId);
        }
    };

    const handleCardClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div
                className={`task-card ${task.priority?.toLowerCase()}-priority clickable`}
                onClick={handleCardClick}
            >
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
                            <button className="task-btn edit" onClick={handleEdit}>Edit</button>
                            <button className="task-btn delete" onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>

            <TaskDetailModal
                task={task}
                isOpen={isModalOpen}
                onClose={closeModal}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        </>
    );
}
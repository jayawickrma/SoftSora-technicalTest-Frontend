import {useState } from "react";
import type {TaskModel} from "../Model/TaskModel.ts";

interface EditModalProps {
    task: TaskModel;
    onClose: () => void;
    onSave: (updatedTask: TaskModel) => void;
}

export function EditModal({ task, onClose, onSave }: EditModalProps) {
    const [formData, setFormData] = useState<TaskModel>({ ...task });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onSave(formData);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <h2>Edit Task</h2>
                <div className="modal-form">
                    <label>Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} />

                    <label>Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange}></textarea>

                    <label>Due Date</label>
                    <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} />

                    <label>Status</label>
                    <select name="status" value={formData.status} onChange={handleChange}>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>

                    <label>Priority</label>
                    <select name="priority" value={formData.priority} onChange={handleChange}>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>

                <div className="modal-actions">
                    <button className="save-btn" onClick={handleSave}>Save</button>
                    <button className="cancel-btn" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

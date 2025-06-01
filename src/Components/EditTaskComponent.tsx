// import React, { useState, useEffect } from "react";
// import { Modal, Button, Form } from "react-bootstrap";
// import type { TaskModel } from "../Model/TaskModel";
//
// interface EditTaskModalProps {
//     show: boolean;
//     task: TaskModel | null;
//     onClose: () => void;
//     onSave: (updatedTask: TaskModel) => void;
// }
//
// export function EditTaskModal({ show, task, onClose, onSave }: EditTaskModalProps) {
//     const [editedTask, setEditedTask] = useState<TaskModel>({
//         id:0,
//         title: "",
//         description: "",
//         createdAt: "",
//         dueDate: "",
//         priority: "Low",
//         status: "pending"
//     });
//
//     useEffect(() => {
//         if (task) {
//             setEditedTask(task);
//         }
//     }, [task]);
//
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//         const { name, value } = e.target;
//         setEditedTask(prev => ({ ...prev, [name]: value }));
//     };
//
//     const handleSave = () => {
//         onSave(editedTask);
//         onClose();
//     };
//
//     return (
//         <Modal show={show} onHide={onClose} centered>
//             <Modal.Header closeButton>
//                 <Modal.Title>Edit Task</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <Form>
//                     <Form.Group controlId="taskTitle">
//                         <Form.Label>Title</Form.Label>
//                         <Form.Control type="text" name="title" value={editedTask.title} onChange={handleChange} />
//                     </Form.Group>
//
//                     <Form.Group controlId="taskDescription" className="mt-3">
//                         <Form.Label>Description</Form.Label>
//                         <Form.Control as="textarea" rows={3} name="description" value={editedTask.description} onChange={handleChange} />
//                     </Form.Group>
//
//                     <Form.Group controlId="taskDueDate" className="mt-3">
//                         <Form.Label>Due Date</Form.Label>
//                         <Form.Control type="date" name="dueDate" value={editedTask.dueDate} onChange={handleChange} />
//                     </Form.Group>
//
//                     <Form.Group controlId="taskPriority" className="mt-3">
//                         <Form.Label>Priority</Form.Label>
//                         <Form.Select name="priority" value={editedTask.priority} onChange={handleChange}>
//                             <option value="Low">Low</option>
//                             <option value="Medium">Medium</option>
//                             <option value="High">High</option>
//                         </Form.Select>
//                     </Form.Group>
//
//                     <Form.Group controlId="taskStatus" className="mt-3">
//                         <Form.Label>Status</Form.Label>
//                         <Form.Select name="status" value={editedTask.status} onChange={handleChange}>
//                             <option value="Pending">Pending</option>
//                             <option value="In Progress">In Progress</option>
//                             <option value="Completed">Completed</option>
//                         </Form.Select>
//                     </Form.Group>
//                 </Form>
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button variant="secondary" onClick={onClose}>
//                     Cancel
//                 </Button>
//                 <Button variant="primary" onClick={handleSave}>
//                     Save Changes
//                 </Button>
//             </Modal.Footer>
//         </Modal>
//     );
// }
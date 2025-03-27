import { useRef, useState } from "react";
import Modal from "./Modal";

export default function EditTaskModal({ show, onClose, task, onSave }) {
	const [editedTask, setEditedTask] = useState(task);
	const { title, description, status } = editedTask;
	const editFormRef = useRef();

	const changeEditedTask = (key, event) => {
		setEditedTask((prev) => ({ ...prev, [key]: event.target.value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSave(editedTask);
	};

	return (
		<>
			<Modal
				show={show}
				onClose={onClose}
				title="Modifica Task"
				content={
					<form ref={editFormRef} onSubmit={handleSubmit} className="m-2">
						<label htmlFor="title">Inserisci il nuovo titolo </label>
						<input
							id="title"
							type="text"
							value={title}
							onChange={(e) => changeEditedTask("title", e)}
						/>
						<label htmlFor="description">Inserisci la nuova descrizione</label>
						<textarea
							id="description"
							value={description}
							onChange={(e) => changeEditedTask("description", e)}
						/>
						<label htmlFor="status">Seleziona una nuova opzione</label>
						<select
							id="status"
							value={status}
							onChange={(e) => changeEditedTask("status", e)}
							className="ms-2"
						>
							<option value="">Seleziona</option>
							<option value="To do">To do</option>
							<option value="Doing">Doing</option>
							<option value="Done">Done</option>
						</select>
					</form>
				}
				confirmText="Salva"
				onConfirm={() => editFormRef.current.requestSubmit()}
			/>
		</>
	);
}

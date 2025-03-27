import { useRef, useState, useEffect } from "react";
import Modal from "./Modal";

export default function EditTaskModal({ show, onClose, task, onSave }) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [status, setStatus] = useState("");
	const editFormRef = useRef();

	const handleSubmit = (e) => {
		e.preventDefault();

		const updatedTask = { ...task, title, description, status };
		onSave(updatedTask);

		setTitle("");
		setDescription("");
		setStatus("");
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
							name="title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
						<label htmlFor="description">Inserisci la nuova descrizione</label>
						<textarea
							id="description"
							name="description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
						<label htmlFor="status">Seleziona una nuova opzione</label>
						<select
							id="status"
							value={status}
							onChange={(e) => setStatus(e.target.value)}
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

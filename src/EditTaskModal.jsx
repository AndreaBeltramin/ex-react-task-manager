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
					<form
						ref={editFormRef}
						onSubmit={handleSubmit}
						className="m-2 d-flex flex-column"
					>
						<label htmlFor="title" className="fs-4">
							Inserisci il nuovo titolo:
						</label>
						<input
							id="title"
							type="text"
							value={title.toLowerCase()}
							onChange={(e) => changeEditedTask("title", e)}
							className="fs-4"
						/>
						<label htmlFor="description" className="fs-4">
							Inserisci la nuova descrizione:{" "}
						</label>
						<textarea
							id="description"
							value={description.toLowerCase()}
							onChange={(e) => changeEditedTask("description", e)}
							className="fs-4 mt-2"
						/>
						<label htmlFor="status" className="fs-4">
							Seleziona una nuova opzione:{" "}
						</label>
						<select
							id="status"
							value={status}
							onChange={(e) => changeEditedTask("status", e)}
							className="ms-2 fs-4"
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

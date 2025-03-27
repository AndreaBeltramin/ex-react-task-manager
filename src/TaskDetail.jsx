import { useContext, useState } from "react";
import { taskContext } from "./GlobalContext";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import EditTaskModal from "./EditTaskModal";

export default function TaskDetail() {
	const { tasks, removeTask, updateTask } = taskContext();
	const { id } = useParams();
	const navigate = useNavigate();
	const [showModal, setShowModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const taskDetail = tasks.find((task) => task.id == id);

	function handleConfirm() {
		removeTask(id);
		navigate("/");
	}

	async function handleSave(updatedTask) {
		try {
			await updateTask(updatedTask);
			alert("Task aggiornata con successo");
			setShowEditModal(false);
		} catch {
			alert("Errore" + error.message);
		}
	}
	return (
		<div className="container mt-4">
			{taskDetail ? (
				<div>
					<h1>Task detail di: {taskDetail.title}</h1>
					<p>Stato: {taskDetail.status}</p>
					<p>Descrizione: {taskDetail.description}</p>
					<p>Creata il: {taskDetail.createdAt}</p>
					<button
						onClick={() => {
							setShowModal(true);
						}}
						className="btn btn-danger"
						type="button"
					>
						Elimina Task
					</button>
					<button
						className="btn btn-primary ms-2"
						onClick={() => {
							setShowEditModal(true);
						}}
					>
						Modifica Task
					</button>
					<Modal
						title={`Conferma eliminazione task : ${taskDetail.title}`}
						content="Sei sicuro di voler eliminare questa task?"
						show={showModal}
						onClose={() => setShowModal(false)}
						onConfirm={handleConfirm}
						confirmText="Elimina"
					/>
					<EditTaskModal
						show={showEditModal}
						onClose={() => setShowEditModal(false)}
						task={taskDetail}
						onSave={handleSave}
					/>
				</div>
			) : (
				<h1>Task non presente</h1>
			)}
		</div>
	);
}

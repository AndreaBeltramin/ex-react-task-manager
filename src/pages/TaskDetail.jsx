import { useState } from "react";
import { taskContext } from "../GlobalContext";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "../Modal";
import EditTaskModal from "../EditTaskModal";

export default function TaskDetail() {
	const { tasks, removeTask, updateTask } = taskContext();
	const { id } = useParams();
	const navigate = useNavigate();

	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);

	const taskDetail = tasks.find((task) => task.id == id);

	if (!taskDetail) return <h1 className="mt-4 ms-4">Task non trovata!</h1>;

	async function handleConfirm() {
		try {
			await removeTask(id);
			alert("Task eliminata con successo!");
			navigate("/");
		} catch (error) {
			console.error(error);
			alert(error.message);
		}
	}

	async function handleSave(updatedTask) {
		try {
			await updateTask(updatedTask);
			alert("Task aggiornata con successo");
			setShowEditModal(false);
		} catch {
			console.error(error);
			alert("Errore" + error.message);
		}
	}
	return (
		<div className="container mt-4">
			{taskDetail ? (
				<div>
					<h1 className="mb-4">
						Dettaglio della task: {taskDetail.title.toLowerCase()}
					</h1>
					<div>
						<p>
							Stato: <strong>{taskDetail.status}</strong>
						</p>
						<p>Descrizione: {taskDetail.description}</p>
						<p>
							Creata il: {new Date(taskDetail.createdAt).toLocaleDateString()}
						</p>
					</div>
					<button
						onClick={() => {
							setShowDeleteModal(true);
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

					{/* modale per eliminazione task */}
					<Modal
						title={`Conferma eliminazione della task : ${taskDetail.title.toLowerCase()}`}
						content="Sei sicuro di voler eliminare questa task?"
						show={showDeleteModal}
						onClose={() => setShowDeleteModal(false)}
						onConfirm={handleConfirm}
						confirmText="Elimina"
					/>

					{/* modale per modifica task */}
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

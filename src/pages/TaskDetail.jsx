import { useContext } from "react";
import { GlobalContext } from "../GlobalContext";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "../Modal";
import EditTaskModal from "../EditTaskModal";

export default function TaskDetail() {
	const { tasks, removeTask, updateTask } = useContext(GlobalContext);
	const { id } = useParams();
	const navigate = useNavigate();

	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);

	const taskDetail = tasks.find((task) => task.id === parseInt(id));

	if (!taskDetail) return <h1 className="mt-4 ms-4">Task non trovata!</h1>;

	const handleDelete = async () => {
		try {
			await removeTask(taskDetail.id);
			alert("Task eliminata con successo!");
			navigate("/");
		} catch (error) {
			console.error(error);
			alert(error.message);
		}
	};

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
						<p className="fs-3">
							Stato: <strong>{taskDetail.status}</strong>
						</p>
						<p className="fs-3">
							Descrizione: {taskDetail.description.toLowerCase()}
						</p>
						<p className="fs-3">
							Creata il: {new Date(taskDetail.createdAt).toLocaleDateString()}
						</p>
					</div>
					<button
						onClick={() => {
							setShowDeleteModal(true);
						}}
						className="btn btn-danger fs-5"
						type="button"
					>
						Elimina Task
					</button>
					<button
						className="btn btn-primary ms-2 fs-5"
						onClick={() => {
							setShowEditModal(true);
						}}
					>
						Modifica Task
					</button>

					{/* modale per eliminazione task */}
					<Modal
						title={`Conferma eliminazione della task : ${taskDetail.title.toLowerCase()}`}
						content={<h2>Sei sicuro di voler eliminare questa task?</h2>}
						show={showDeleteModal}
						onClose={() => setShowDeleteModal(false)}
						onConfirm={handleDelete}
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

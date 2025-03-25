import { useContext, useEffect, useState } from "react";
import { Context } from "./GlobalContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

export default function TaskDetail() {
	const apiUrl = import.meta.env.VITE_URL_API;
	const [tasks, fetchTaskList, addTask, removeTask, updateTask] = Context();
	const { id } = useParams();
	const navigate = useNavigate();
	const [show, setShow] = useState(false);
	const taskDetail = tasks.find((task) => task.id == id);

	function handleConfirm() {
		removeTask(id);
		navigate("/");
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
							setShow(true);
						}}
						className="btn btn-primary"
						type="button"
					>
						Elimina Task
					</button>
					<Modal
						title={`Conferma eliminazione task : ${taskDetail.title}`}
						content="Sei sicuro di voler eliminare questa task?"
						show={show}
						onClose={() => setShow(false)}
						onConfirm={handleConfirm}
						confirmText="Elimina"
					/>
				</div>
			) : (
				<h1>Task non presente</h1>
			)}
		</div>
	);
}

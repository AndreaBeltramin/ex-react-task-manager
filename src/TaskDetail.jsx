import { useEffect, useState } from "react";
import { Context } from "./GlobalContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function TaskDetail() {
	const apiUrl = import.meta.env.VITE_URL_API;
	const [tasks, addTask, removeTask] = Context();
	const { id } = useParams();
	const navigate = useNavigate();

	const taskDetail = tasks.filter((task) => task.id == id);

	return (
		<div className="container mt-4">
			{taskDetail ? (
				<div>
					<h1>Task detail di: {taskDetail[0].title}</h1>
					<p>Stato: {taskDetail[0].status}</p>
					<p>Descrizione: {taskDetail[0].description}</p>
					<p>Creata il: {taskDetail[0].createdAt}</p>
					<button
						onClick={() => {
							removeTask(id);
							navigate("/");
						}}
						className="btn btn-primary"
					>
						Elimina Task
					</button>
				</div>
			) : (
				<h1>Task non presente</h1>
			)}
		</div>
	);
}

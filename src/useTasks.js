import { useState, useEffect } from "react";

export default function useTasks() {
	const [tasks, setTasks] = useState([]);
	const apiUrl = import.meta.env.VITE_URL_API;

	// all'avvio dell'app effettuo una richiesta al server per ricevere le task
	useEffect(() => {
		fetchTaskList();
	}, []);

	// funzione per visualizzare la lista delle task
	const fetchTaskList = () => {
		fetch(`${apiUrl}/tasks`)
			.then((res) => res.json())
			.then((data) => {
				setTasks(data);
			})
			.catch((error) => console.error(error));
	};

	// funzione per aggiungere una task
	const addTask = async (newTask) => {
		const response = await fetch(`${apiUrl}/tasks`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newTask),
		});
		const { success, message, task } = await response.json();
		if (!success) {
			throw new Error(message);
		}
		setTasks((prev) => [...prev, task]);
	};

	// funzione per rimuovere una task
	const removeTask = async (id) => {
		const response = await fetch(`${apiUrl}/tasks/${id}`, {
			method: "DELETE",
		});
		const { success, message } = await response.json();
		if (!success) throw new Error(message);

		setTasks((prev) => prev.filter((task) => task.id !== id));
	};

	// funzione per modificare una task
	const updateTask = async (updatedTask) => {
		try {
			const response = await fetch(`${apiUrl}/tasks/${updatedTask.id}`, {
				method: "PUT",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(updatedTask),
			});
			const data = await response.json();
			if (!data.success) {
				throw new Error(data.message);
			}
			setTasks((prevTasks) =>
				prevTasks.map((task) => (task.id === updatedTask.id ? data.task : task))
			);
		} catch (error) {
			throw new Error("Errore nella modifica della task: " + error.message);
		}
	};

	return { tasks, fetchTaskList, addTask, removeTask, updateTask };
}

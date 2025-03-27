import { useState, useEffect } from "react";

export default function useTasks() {
	const [tasks, setTasks] = useState([]);
	const apiUrl = import.meta.env.VITE_URL_API;

	// all'avvio dell'app effettuo una richiesta al server per ricevere le task
	useEffect(() => {
		fetchTaskList();
	}, []);

	const fetchTaskList = () => {
		fetch(`${apiUrl}/tasks`)
			.then((res) => res.json())
			.then((data) => {
				setTasks(data);
			})
			.catch((error) => console.error(error));
	};

	const addTask = (data) => {
		fetch(`${apiUrl}/tasks`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.success === false) {
					console.error(data.message);
					alert(data.message);
					return;
				} else if (data.success === true) {
					console.log(data);
					alert("Aggiunta task avvenuta con successo");
					fetchTaskList();
				}
			});
	};

	const removeTask = (id) => {
		fetch(`${apiUrl}/tasks/${id}`, {
			method: "DELETE",
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.success === false) {
					alert(data.message);
					return;
				} else if (data.success === true) {
					alert("Task eliminata con successo");
					fetchTaskList();
				}
			});
	};
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

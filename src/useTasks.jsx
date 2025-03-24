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

	const addTask = () => {};
	const removeTask = () => {};
	const updateTask = () => {};

	return { tasks, fetchTaskList, addTask, removeTask, updateTask };
}

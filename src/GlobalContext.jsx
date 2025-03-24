import { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
	const apiUrl = import.meta.env.VITE_URL_API;

	// all'avvio dell'app effettuo una richiesta al server per ricevere le task
	useEffect(() => {
		fetchTaskList();
	}, []);

	const [taskData, setTaskData] = useState([]);

	const fetchTaskList = () => {
		fetch(`${apiUrl}/tasks`)
			.then((res) => res.json())
			.then((data) => {
				setTaskData(data);
			})
			.catch((error) => console.error(error));
	};

	return (
		<GlobalContext.Provider value={taskData}>{children}</GlobalContext.Provider>
	);
};

export const Context = () => {
	return useContext(GlobalContext);
};

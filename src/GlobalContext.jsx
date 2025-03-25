import { createContext, useContext, useEffect, useState } from "react";
import useTasks from "./useTasks";

// creo un contesto
const GlobalContext = createContext();

// esporto il provider
export const GlobalProvider = ({ children }) => {
	const { tasks, fetchTaskList, addTask, removeTask, updateTask } = useTasks();

	// return del provider
	return (
		<GlobalContext.Provider value={[tasks, addTask, removeTask]}>
			{children}
		</GlobalContext.Provider>
	);
};

// esporto il contesto
export const Context = () => {
	return useContext(GlobalContext);
};

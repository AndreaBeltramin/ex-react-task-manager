import { createContext, useContext } from "react";
import useTasks from "./useTasks";

// creo un contesto
const GlobalContext = createContext();

// esporto il provider
export const GlobalProvider = ({ children }) => {
	const taskData = useTasks();

	// return del provider
	return (
		<GlobalContext.Provider value={{ ...taskData }}>
			{children}
		</GlobalContext.Provider>
	);
};

// esporto il contesto
export const taskContext = () => {
	return useContext(GlobalContext);
};

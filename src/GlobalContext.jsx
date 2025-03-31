import { createContext } from "react";
import useTasks from "./useTasks";

// creo un contesto
export const GlobalContext = createContext();

// esporto il provider
export function GlobalProvider({ children }) {
	const taskData = useTasks();

	// return del provider
	return (
		<GlobalContext.Provider value={{ ...taskData }}>
			{children}
		</GlobalContext.Provider>
	);
}

import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./DefaultLayout";
import { GlobalProvider } from "./GlobalContext";

//importazione pagine
import TaskList from "./TaskList";
import AddTask from "./AddTask";

function App() {
	return (
		<GlobalProvider>
			<BrowserRouter>
				<Routes>
					<Route Component={DefaultLayout}>
						<Route path="/" Component={TaskList} />
						<Route path="/addTask" Component={AddTask} />
					</Route>
				</Routes>
			</BrowserRouter>
		</GlobalProvider>
	);
}

export default App;

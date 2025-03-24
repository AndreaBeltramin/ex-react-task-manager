import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./DefaultLayout";

//importazione pagine
import TaskList from "./TaskList";
import AddTask from "./AddTask";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route Component={DefaultLayout}>
					<Route path="/" Component={TaskList} />
					<Route path="/addTask" Component={AddTask} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;

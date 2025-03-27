import { taskContext } from "./GlobalContext";
import TableRow from "./TaskRow";

export default function TaskList() {
	const { tasks, fetchTaskList, addTask, removeTask, updateTask } =
		taskContext();

	return (
		<>
			<div className="container mt-4">
				<h1>Lista delle task</h1>
				{tasks.length > 0 ? (
					<table className="table table-bordered">
						<thead>
							<tr>
								<th scope="col">Nome</th>
								<th scope="col">Stato</th>
								<th scope="col">Data di creazione</th>
							</tr>
						</thead>
						<tbody>
							{tasks.map((task) => (
								<TableRow task={task} key={task.id} />
							))}
						</tbody>
					</table>
				) : (
					<div>Nessuna task da visualizzare</div>
				)}
			</div>
		</>
	);
}

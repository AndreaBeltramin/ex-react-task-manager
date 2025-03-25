import { Context } from "./GlobalContext";
import TableRow from "./TaskRow";

export default function TaskList() {
	const [tasks, addTask] = Context();

	return (
		<>
			<div className="container mt-4">
				<h1>Lista delle task</h1>

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
			</div>
		</>
	);
}

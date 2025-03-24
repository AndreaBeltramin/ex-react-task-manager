import { Context } from "./GlobalContext";
import TableRow from "./TaskRow";

export default function TaskList() {
	const tasksData = Context();

	return (
		<>
			<div className="container mt-4">
				<h1>Titolo pagina principale</h1>
			</div>
			<table className="table table-bordered">
				<thead>
					<tr>
						<th scope="col">Nome</th>
						<th scope="col">Stato</th>
						<th scope="col">Data di creazione</th>
					</tr>
				</thead>
				<tbody>
					{tasksData.map((task) => (
						<TableRow task={task} key={task.id} />
					))}
				</tbody>
			</table>
		</>
	);
}

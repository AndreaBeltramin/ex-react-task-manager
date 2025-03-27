import { useMemo, useState } from "react";
import { taskContext } from "./GlobalContext";
import TableRow from "./TaskRow";

export default function TaskList() {
	const { tasks } = taskContext();
	// rappresenta il criterio di ordinamento (title, status, createdAt)
	const [sortBy, setSortBy] = useState("createdAt");
	// rappresenta la direzione ( 1 crescente, -1 decrescente)
	const [sortOrder, setSortOrder] = useState(1);

	// funzione per ordinare i tasks
	const sortedTasks = useMemo(() => {
		return [...tasks].sort((a, b) => {
			if (sortBy === "title") {
				return a.title.localeCompare(b.title) * sortOrder;
			} else if (sortBy === "status") {
				return a.status.localeCompare(b.status) * sortOrder;
			} else if (sortBy === "createdAt") {
				return a.createdAt.localeCompare(b.createdAt) * sortOrder;
			}
			return 0;
		});
	}, [tasks, sortBy, sortOrder]);

	// funzione per cambiare direzione di ordinamento
	const handleSort = (criterio) => {
		if (sortBy === criterio) {
			setSortOrder(-sortOrder);
		} else {
			setSortBy(criterio);
			setSortOrder(1);
		}
	};

	return (
		<>
			<div className="container mt-4">
				<h1>Lista delle task</h1>
				{tasks.length > 0 ? (
					<table className="table table-bordered">
						<thead>
							<tr>
								<th scope="col" onClick={() => handleSort("title")}>
									Nome{" "}
									{sortBy === "title" ? (sortOrder === 1 ? "▲ C" : "▼ D") : ""}
								</th>
								<th scope="col" onClick={() => handleSort("status")}>
									Stato{" "}
									{sortBy === "status" ? (sortOrder === 1 ? "▲ C" : "▼ D") : ""}
								</th>
								<th scope="col" onClick={() => handleSort("createdAt")}>
									Data di creazione
								</th>
							</tr>
						</thead>
						<tbody>
							{sortedTasks.map((task) => (
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

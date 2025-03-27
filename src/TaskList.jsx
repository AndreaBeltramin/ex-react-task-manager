import { useMemo, useState, useRef, useCallback } from "react";
import { taskContext } from "./GlobalContext";
import TableRow from "./TaskRow";

// Funzione debounce generica
function debounce(callback, delay) {
	let timer;
	return (value) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			callback(value);
		}, delay);
	};
}

export default function TaskList() {
	const { tasks, setTasks } = taskContext();
	// rappresenta il criterio di ordinamento (title, status, createdAt)
	const [sortBy, setSortBy] = useState("createdAt");
	// rappresenta la direzione ( 1 crescente, -1 decrescente)
	const [sortOrder, setSortOrder] = useState(1);

	const searchQueryRef = useRef();

	const handleSearch = useCallback(
		debounce(() => {
			const searchedTask = sortedTasks.filter((sortedTask) => {
				return sortedTask.title
					.toLowerCase()
					.includes(searchQueryRef.current.value.toLowerCase());
				// ||
				// sortedTask.description
				// 	.toLowerCase()
				// 	.includes(searchQueryRef.current.value.toLowerCase())
			});
			setTasks(searchedTask);
		}, 100),
		[]
	);

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
					<div>
						<div className="mt-3 mb-3">
							<input
								type="text"
								name="ricerca"
								placeholder="Ricerca task"
								ref={searchQueryRef}
							/>
							<button onClick={handleSearch} className="btn btn-primary ms-2">
								Cerca
							</button>
						</div>
						<table className="table table-bordered">
							<thead>
								<tr>
									<th scope="col" onClick={() => handleSort("title")}>
										Nome{" "}
										{sortBy === "title"
											? sortOrder === 1
												? "▲ C"
												: "▼ D"
											: ""}
									</th>
									<th scope="col" onClick={() => handleSort("status")}>
										Stato{" "}
										{sortBy === "status"
											? sortOrder === 1
												? "▲ C"
												: "▼ D"
											: ""}
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
					</div>
				) : (
					<div>Nessuna task da visualizzare</div>
				)}
			</div>
		</>
	);
}

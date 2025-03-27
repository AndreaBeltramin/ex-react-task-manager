import { useMemo, useState, useRef, useCallback } from "react";
import { taskContext } from "../GlobalContext";
import TableRow from "../TaskRow";

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

	const [checked, setChecked] = useState();

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
			// ci calcoliamo tutto in modo crescente, poi con * sortOrder
			// (se sortOrder dovesse essere -1) ci troviamo l'ordine decrescente
			if (sortBy === "title") {
				return a.title.localeCompare(b.title) * sortOrder;
			} else if (sortBy === "status") {
				// faccio un sort numerico invece di quello alfabetico dove i valori numerici sono
				// gli indici a cui appartengono gli status nell'array, in questo modo li gestico come numeri
				const statusOptions = ["To do", "Doing", "Done"];
				const statusA = statusOptions.indexOf(a.status);
				const statusB = statusOptions.indexOf(b.status);
				return (statusA - statusB) * sortOrder;
			} else if (sortBy === "createdAt") {
				const dateA = new Date(a.createdAt).getTime();
				const dateB = new Date(b.createdAt).getTime();
				return (dateA - dateB) * sortOrder;
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

	const sortIcon = sortOrder === 1 ? "▲ C" : "▼ D";

	return (
		<>
			<div className="container mt-4">
				<h1>Lista delle task</h1>
				{tasks.length > 0 ? (
					<div>
						<div className="mt-3 mb-3">
							<input
								type="text"
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
										Nome {sortBy === "title" && sortIcon}
									</th>
									<th scope="col" onClick={() => handleSort("status")}>
										Stato {sortBy === "status" && sortIcon}
									</th>
									<th scope="col" onClick={() => handleSort("createdAt")}>
										Data di creazione {sortBy === "createdAt" && sortIcon}
									</th>
								</tr>
							</thead>
							<tbody>
								{sortedTasks.map((task) => (
									<TableRow task={task} checked onToggle key={task.id} />
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

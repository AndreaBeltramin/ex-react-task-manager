import { useState, useRef, useMemo } from "react";
import { useContext } from "react";
import { GlobalContext } from "../GlobalContext";

const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

export default function AddTask() {
	const [title, setTitle] = useState("");
	const descriptionRef = useRef();
	const statusRef = useRef();
	const { addTask } = useContext(GlobalContext);

	const isTitleNotValid = useMemo(() => {
		if (!title.trim()) return "Il titolo non può essere vuoto";
		if ([...title].some((char) => symbols.includes(char)))
			return "Il titolo non può contenere simboli";
		return "";
	}, [title]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (isTitleNotValid) return;

		const newTask = {
			title: title.trim(),
			description: descriptionRef.current.value,
			status: statusRef.current.value,
		};
		try {
			await addTask(newTask);
			alert("Task aggiunta con successo!");
			setTitle("");
			descriptionRef.current.value = "";
			statusRef.current.value = "";
		} catch (error) {
			alert(error.message);
		}
	};
	return (
		<>
			<div className="container mt-4">
				<h1>Form per aggiunta task</h1>
				<div className="row">
					<div className="row-cols-2">
						<form onSubmit={handleSubmit}>
							<div className="mb-3">
								<label htmlFor="titleTask" className="form-label">
									Nome della task
								</label>
								<input
									type="text"
									className="form-control"
									id="titleTask"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
								/>
								{isTitleNotValid && (
									<p style={{ color: "red" }}>{isTitleNotValid}</p>
								)}
							</div>
							<div className="mb-3">
								<label htmlFor="descrizioneTask" className="form-label">
									Descrizione
								</label>
								<textarea
									className="form-control"
									id="descrizioneTask"
									ref={descriptionRef}
								/>
							</div>

							<div className="mb-3">
								<label htmlFor="selectTask" className="form-label">
									Stato
								</label>
								<select
									className="form-select"
									id="selectTask"
									ref={statusRef}
									defaultValue="To do"
								>
									<option defaultValue="Seleziona uno status">
										Seleziona uno status
									</option>
									<option value="To do">To do</option>
									<option value="Doing">Doing</option>
									<option value="Done">Done</option>
								</select>
							</div>
							<button className="btn btn-primary" disabled={isTitleNotValid}>
								Aggiungi Task
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

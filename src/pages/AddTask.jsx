import { useState, useRef } from "react";
import { taskContext } from "../GlobalContext";

const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

export default function AddTask() {
	const [title, setTitle] = useState("");
	const descriptionRef = useRef();
	const statusRef = useRef();
	const { addTask } = taskContext();

	const isTitleNotValid = [...title].some((char) => symbols.includes(char));

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!title || isTitleNotValid) {
			alert("Inserisci un titolo valido!");
			return;
		}
		const data = {
			title,
			description: descriptionRef.current.value,
			status: statusRef.current.value,
		};
		addTask(data);

		// console.log("task", {
		// 	title,
		// 	description: descriptionRef.current.value,
		// 	status: statusRef.current.value,
		// });

		setTitle("");
		descriptionRef.current.value = "";
		statusRef.current.value = "";
	};
	return (
		<>
			<div className="container mt-4">
				<h1>Form per aggiunta Task</h1>
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
								<select className="form-select" id="selectTask" ref={statusRef}>
									<option defaultValue="Seleziona uno status">
										Seleziona uno status
									</option>
									<option value="To do">To do</option>
									<option value="Doing">Doing</option>
									<option value="Done">Done</option>
								</select>
							</div>
							<button type="submit" className="btn btn-primary">
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

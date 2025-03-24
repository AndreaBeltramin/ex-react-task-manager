import { NavLink } from "react-router-dom";
import AddTask from "./AddTask";

export default function Header() {
	return (
		<>
			<nav className="navbar navbar-expand-lg bg-body-tertiary">
				<div className="container-fluid">
					<a className="navbar-brand" href="#">
						Task Manager Avanzato
					</a>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNav"
						aria-controls="navbarNav"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav">
							<li className="nav-item">
								<NavLink
									to="/"
									className="nav-link active"
									aria-current="page"
									href="#"
								>
									Home/Lista Task
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink to="/addTask" className="nav-link" href="#">
									Aggiungi Task
								</NavLink>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
}

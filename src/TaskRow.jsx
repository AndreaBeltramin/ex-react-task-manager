import React, { useState } from "react";
import { Link } from "react-router-dom";

const TableRow = React.memo(({ task, checked, onToggle }) => {
	return (
		<>
			<tr>
				<th scope="row">
					<div className="d-flex justify-content-between">
						<Link to={`/task/${task.id}`}>{task.title}</Link>
						<input
							type="checkbox"
							checked={checked}
							// onChange={onToggle(task.id)}
						/>
					</div>
				</th>

				<td
					className={
						task.status === "To do"
							? "bg-danger"
							: task.status === "Doing"
							? "bg-warning"
							: "bg-success"
					}
				>
					{task.status}
				</td>
				<td>{new Date(task.createdAt).toLocaleDateString()}</td>
			</tr>
		</>
	);
});

export default TableRow;

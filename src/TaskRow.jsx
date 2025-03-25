import React from "react";

import { Link } from "react-router-dom";

const TableRow = React.memo(({ task }) => {
	return (
		<>
			<tr>
				<th scope="row">
					<Link to={`/task/${task.id}`}>{task.title}</Link>
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
				<td>{task.createdAt}</td>
			</tr>
		</>
	);
});

export default TableRow;

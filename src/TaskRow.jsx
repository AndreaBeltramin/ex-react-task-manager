import { Context } from "./GlobalContext";
import React from "react";

const TableRow = React.memo(({ task }) => {
	return (
		<>
			<tr>
				<th scope="row">{task.title}</th>
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

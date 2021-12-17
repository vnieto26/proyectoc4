import React, { useState, useEffect } from "react";
import axios from "axios";
//import { Link } from "react-router-dom";

export default function Inicio(props) {
	const [proyecto, setProyecto] = useState([]);

	const url = `http://localhost:5000/api/projects/`;
	useEffect(() => {
		axios
			.get(url)
			.then((response) => {
				console.log(response.data);
				setProyecto(response.data);
			})
			.catch((e) => console.log(e));
	}, [url]);

	return (
		<div>
			<h1 className="text-center">Dashboard</h1>
			<div className="row row-cols-1 row-cols-md-2 g-4">
				{proyecto?.map((p) => (
					<div
						className="card border-primary mb-3 m-3"
						Style="max-width: 18rem;"
					>
						<div className="card-header">Proyecto</div>
						<div className="card-body">
							<h5 classNAme="card-title text-uppercase">{p.name}</h5>
							<p className="card-text">{p.description}</p>
							<div className="card-footer text-muted">{p.createdAt}</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

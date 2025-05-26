import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Inicio(props) {
	const [tareas, setTareas] = useState([]);
	const [proyectos, setProyectos] = useState([]);

	useEffect(() => {
		axios
			.all([
				axios.get("http://localhost:5000/api/tasks/"),
				axios.get("http://localhost:5000/api/projects/"),
			])
			.then(
				axios.spread((tarea, proyectos, usuarios) => {
					console.log(tarea.data);
					console.log(proyectos.data);
					setTareas(tarea.data);
					setProyectos(proyectos.data);
				})
			)
			.catch((e) => console.log(e));
	}, []);

	return (
		<div>
			<section>
				<h1 className="text-center m-4">Tareas</h1>
				<div className="row row-cols-1 row-cols-md-2 g-4">
					{tareas?.map((tarea) => (
						<div
							key={tarea._id}
							className="card border-primary m-3"
							style={{ maxWidth: "18rem" }}
						>
							<div className="card-header">Tarea</div>
							<div className="card-body">
								<h5 className="card-title text-uppercase">{tarea.task}</h5>
								<p className="card-text">
									{tarea.projectId?.name || "Sin proyecto"}
								</p>
								<p className="card-text">
									{tarea.userId?.username || "Sin usuario"}
								</p>
								<p className="card-text">{tarea.state}</p>
								<div className="card-footer text-muted">
									{tarea.createdAt
										? new Date(tarea.createdAt).toLocaleString()
										: ""}
								</div>
							</div>
						</div>
					))}
				</div>
			</section>
			<section>
				<h1 className="text-center m-5">
					<span>Proyectos</span>{" "}
				</h1>
				<div className="row row-cols-1 row-cols-md-2 g-4">
					{proyectos?.map((proyecto) => (
						<div
							key={proyecto._id}
							className="card border-primary m-3"
							style={{ maxWidth: "18rem" }}
						>
							<div className="card-header">Proyecto</div>
							<div className="card-body">
								<h5 className="card-title text-uppercase">{proyecto.name}</h5>
								<p className="card-text">{proyecto.description}</p>
								<div className="card-footer text-muted">
									{proyecto.createdAt
										? new Date(proyecto.createdAt).toLocaleString()
										: ""}
								</div>
							</div>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}

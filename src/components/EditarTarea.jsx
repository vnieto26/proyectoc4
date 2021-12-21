import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function EditarTareas() {
	const [tareas, setTareas] = useState({
		task: "",
		state: "",
		projectId: "",
		userId: "",
	});
	const [proyectos, setProyectos] = useState();
	const [usuarios, setUsuarios] = useState();

	const { id } = useParams();

	function cambiarValorT(event) {
		const { name, value } = event.target;
		setTareas({ ...tareas, [name]: value });
	}

	function enviarDatosTareas(event) {
		event.preventDefault();
		const datos = {
			task: tareas.task,
			state: tareas.state,
			projectId: tareas.projectId,
			userId: tareas.userId,
		};
		axios
			.put(`http://localhost:5000/api/tasks/${id}`, datos)
			.then((response) => setTareas(response.data.updatedAt));
		window.location = "/tareas";
	}

	useEffect(() => {
		axios
			.all([
				axios.get(`http://localhost:5000/api/tasks/${id}`),
				axios.get("http://localhost:5000/api/projects/"),
				axios.get("http://localhost:5000/api/users/"),
			])
			.then(
				axios.spread((tarea, proyectos, usuarios) => {
					console.log(tarea.data);
					console.log(proyectos.data);
					console.log(usuarios.data);
					setTareas(tarea.data);
					setProyectos(proyectos.data);
					setUsuarios(usuarios.data);
				})
			)
			.catch((e) => console.log(e));
	}, [id]);

	return (
		<div className="card">
			<div className="card-header">
				<h4>Editar Tarea</h4>
			</div>
			<div className="card-body">
				<form onSubmit={enviarDatosTareas}>
					<div className="form-group">
						<label htmlFor="">Nombre de la Tarea</label>
						<input
							type="text"
							name="task"
							onChange={cambiarValorT}
							value={tareas.task}
							id="task"
							className="form-control"
							required
							aria-describedby="helpId"
						></input>
					</div>
					<div className="form-group" required>
						<label htmlFor="">Estado de la tarea</label>
						<select
							className="form-select"
							name="state"
							onChange={cambiarValorT}
							required
						>
							<option value={tareas.state}>{tareas.state}</option>
							<option value="En Ejecución">En Ejecución</option>
							<option value="Finalizada">Finalizada</option>
						</select>
					</div>
					<div className="form-group">
						<label htmlFor="">Proyecto</label>
						<select
							className="form-select"
							aria-label="project"
							name="projectId"
							id="project"
							onChange={cambiarValorT}
							required
						>
							<option value={tareas.projectId._id}>{tareas.projectId.name}</option>
							{proyectos?.map((p) => (
								<option key={p._id} value={p._id}>
									{p.name}
								</option>
							))}
							;
						</select>
					</div>
					<div className="form-group">
						<label htmlFor="">Usuarios</label>
						<select
							className="form-select"
							aria-label="usuario"
							name="userId"
							id="usuario"
							onChange={cambiarValorT}
							required
						>
							<option value={tareas.userId._id}>{tareas.userId.username}</option>
							{usuarios?.map((user) => (
								<option key={user._id} value={user._id}>
									{user.username}
								</option>
							))}
							;
						</select>
					</div>
					<br />
					<div className="btn-group" role="group" aria-label="">
						<button type="submit" className="btn btn-success">
							Guardar Tarea
						</button>
						<Link to={"/tareas"} className="btn btn-primary">
							Cancelar
						</Link>
					</div>
				</form>
			</div>
			<div className="card-footer text-muted"></div>
		</div>
	);
}

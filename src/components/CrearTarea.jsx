import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
//import SelectProyectos from "./SelectProyectos";
//import SelectUsuarios from "./SelectUsuarios";

export default class CrearTarea extends React.Component {
	state = {
		task: "",
		estado: "",
		project: "",
		usuario: "",
		proyectos: [],
		projects: [],
		users: [],
	};

	cambiarValorTarea = (event) => {
		const state = this.state;
		state[event.target.name] = event.target.value;
		this.setState({ state });
	};

	enviarDatosTarea = (event) => {
		event.preventDefault();
		const tarea = {
			task: this.state.task,
			estado: this.state.estado,
			project: this.state.project,
			usuario: this.state.usuario,
		};

		axios
			.post("http://localhost:5000/api/tasks/", {
				task: tarea.task,
				state: tarea.estado,
				projectId: tarea.project,
				userId: tarea.usuario,
				headers: { "Content-Type": "multipart/form-data" },
			})
			.then((res) => {
				console.log(res);
				console.log(res.data);
				window.location = "/tareas";
			});
	};

	cargarProyectos() {
		axios.get("http://localhost:5000/api/projects/").then((respuesta) => {
			const projects = respuesta.data;
			this.setState({ projects });
		});
	}

	cargarUsuario() {
		const tokenString = localStorage.getItem("token");
		const token = JSON.parse(tokenString);
		axios
			.get("http://localhost:5000/api/users/", {
				headers: {
					"Content-Type": "multipart/form-data",
					"x-access-token": token.token,
				},
			})
			.then((respuesta) => {
				const users = respuesta.data;
				this.setState({ users });
			});
	}

	componentDidMount() {
		this.cargarProyectos();
		this.cargarUsuario();
	}
	

	render() {
		const { projects, users } = this.state;
		if (!projects) {
			return <div>Cargando...</div>;
		} else {
			return (
				<div className="card">
					<div className="card-header">
						<h4>Crear Nueva Tarea</h4>
					</div>
					<div className="card-body">
						<form onSubmit={this.enviarDatosTarea}>
							<div className="form-group">
								<label htmlFor="">Nombre de la Tarea</label>
								<input
									type="text"
									name="task"
									onChange={this.cambiarValorTarea}
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
									name="estado"
									onChange={this.cambiarValorTarea}
									required
								>
									<option value="">Seleccione un estado</option>
									<option value="Sin Iniciar">Sin Iniciar</option>
									<option value="En Ejecución">En Ejecución</option>
									<option value="Finalizada">Finalizada</option>
								</select>
							</div>
							<div className="form-group">
								<label htmlFor="">Proyecto</label>
								<select
									className="form-select"
									aria-label="project"
									name="project"
									id="project"
									onChange={this.cambiarValorTarea}
									required
								>
									<option value="">Seleccione el proyecto</option>
									{projects?.map((p) => (
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
									name="usuario"
									id="usuario"
									onChange={this.cambiarValorTarea}
									required
								>
									<option value="">Seleccione el usuario</option>
									<option value="Sin Asignar">Sin Asignar</option>
									{users?.map((user) => (
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
	}
}

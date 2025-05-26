import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class CrearProyecto extends React.Component {
	state = {
		name: "",
		description: "",
	};

	cambiarValor = (event) => {
		const state = this.state;
		state[event.target.name] = event.target.value;
		this.setState({ state });
	};

	enviarDatos = (event) => {
		event.preventDefault();
		const proyecto = {
			name: this.state.name,
			description: this.state.description,
		};

		axios
			.post("http://localhost:5000/api/projects/", {
				name: proyecto.name,
				description: proyecto.description,
				headers: { "Content-Type": "multipart/form-data" },
			})
			.then((res) => {
				console.log(res);
				console.log(res.data);
				window.location = "/proyectos";
			});
	};

	render() {
		return (
			<div className="card">
				<div className="card-header">
					<h4> Crear nuevo Proyecto</h4>
				</div>
				<div className="card-body">
					<form onSubmit={this.enviarDatos}>
						<div className="form-group">
							<label htmlFor="">Nombre del proyecto</label>
							<input
								type="text"
								name="name"
								onChange={this.cambiarValor}
								id="name"
								className="form-control"
								placeholder=""
								required
								aria-describedby="helpId"
							/>
							<small id="helpId" className="text-muted">
								Escribe el nombre del proyecto
							</small>
						</div>
						<div className="form-group">
							<label htmlFor="">Descripción del proyecto</label>
							<textarea
								className="form-control rounded-0"
								id="description"
								name="description"
								onChange={this.cambiarValor}
								required
								rows="10"
							></textarea>
							<small id="helpId" className="text-muted">
								Escribe la descripción del proyecto
							</small>
						</div>
						<div className="btn-group" role="group" aria-label="">
							<button type="submit" className="btn btn-success">
								Guardar Proyecto
							</button>
							<Link to={"/proyectos"} className="btn btn-primary">
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
export default CrearProyecto;

import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class CrearUsuario extends React.Component {
	state = {
		username: "",
		email: "",
		password: "",
		roles: "",
	};


   cambiarValorUsuario = (event) => {
		const state = this.state;
		state[event.target.name] = event.target.value;
		this.setState({ state });
	};

	enviarDatosUsuario = (event) => {
		event.preventDefault();
		const proyecto = {
			username: this.state.username,
			email: this.state.email,
			password: this.state.password,
			roles: this.state.roles,
		};

		axios
			.post("http://localhost:5000/api/users/", {
				username: proyecto.username,
				email: proyecto.email,
				password: proyecto.password,
				roles: proyecto.roles,
				headers: { "Content-Type": "multipart/form-data" },
			})
			.then((res) => {
				console.log(res);
				console.log(res.data);
				window.location = "/usuarios"
			});
	};

	render() {
		return (
			<div className="card">
				<div className="card-header"><h4> Crear nuevo Usuario</h4></div>
				<div className="card-body">
					<form onSubmit={this.enviarDatosUsuario}>
						<div className="form-group">
							<label htmlFor="">Nombre del Usuario</label>
							<input
								type="text"
								name="username"
								onChange={this.cambiarValorUsuario}
								id="username"
								className="form-control"
								required
								aria-describedby="helpId"
							></input>
						</div>
						<div className="form-group">
							<label htmlFor="">Email del usuario</label>
							<input
								type="email"
								className="form-control"
								id="email"
								name="email"
								onChange={this.cambiarValorUsuario}
								required
							></input>
						</div>
						<div className="form-group">
							<label htmlFor="">Contraseña del usuario</label>
							<input
								type="password"
								className="form-control"
								id="password"
								name="password"
								onChange={this.cambiarValorUsuario}
								required
							></input>
						</div>
						<div className="form-group">
							<label htmlFor="">Seleccione el rol del usuario</label>
							<select
								className="form-select"
								aria-label="Roles"
								name="roles"
								id="roles"
								onChange={this.cambiarValorUsuario}
								required
							>
                        <option value="">Seleccione el rol</option>
								<option value="admin">Administrador</option>
								<option value="user">Usuario Estandar</option>
							</select>
						</div>
						<br />
						<div className="btn-group" role="group" aria-label="">
							<button type="submit" className="btn btn-success">
								Guardar Usuario
							</button>
							<Link to={"/"} className="btn btn-primary">
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

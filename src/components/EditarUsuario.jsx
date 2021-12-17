import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function EditarUsuario(props) {
	const [usuario, setUsuario] = useState({
		username: "",
		email: "",
		password: "",
		// roles: "",
	});
	const { id } = useParams();

	function cambiarValorUser(event) {
		const { name, value } = event.target;
		setUsuario({ ...usuario, [name]: value });
	}

	function enviarDatosUser(event) {
		event.preventDefault();
		const datos = {
			username: usuario.username,
			email: usuario.email,
			password: usuario.password,
			// roles: usuario.roles,
		};
		axios
			.put(`http://localhost:5000/api/users/${id}`, datos)
			.then((response) => setUsuario(response.data.updatedAt));
		console.log("Datos actualizados");
		window.location = "/usuarios";
	}

	const url = `http://localhost:5000/api/users/${id}`;
	useEffect(() => {
		axios
			.get(url)
			.then((response) => {
				console.log(response.data);
				setUsuario(response.data);
			})
			.catch((e) => console.log(e));
	}, [url]);

	return (
		<div className="card">
			<div className="card-header">
				<h4> Crear nuevo Usuario</h4>
			</div>
			<div className="card-body">
				<form onSubmit={enviarDatosUser}>
					<div className="form-group">
						<label htmlFor="">Nombre del Usuario</label>
						<input
							type="text"
							name="username"
							onChange={cambiarValorUser}
							id="username"
							value={usuario.username}
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
							value={usuario.email}
							onChange={cambiarValorUser}
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
							value={usuario.password}
							onChange={cambiarValorUser}
							required
						></input>
					</div>
					<div className="form-group">
						<label htmlFor="">Seleccione el rol del usuario</label>
						<select
							className="form-select"
							aria-label="Roles"
							name="roles"
							value={usuario.roles}
							id="roles"
							onChange={cambiarValorUser}
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
							Actualizar Usuario
						</button>
						<Link to={"/usuarios"} className="btn btn-primary">
							Cancelar
						</Link>
					</div>
				</form>
			</div>
			<div className="card-footer text-muted"></div>
		</div>
	);
}

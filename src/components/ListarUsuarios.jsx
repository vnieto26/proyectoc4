import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert";

class ListarUsuarios extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			datosCargados: false,
			usuarios: [],
		};
	}

	cargarDatosUsuarios() {
		const tokenString = localStorage.getItem("token");
		const token = JSON.parse(tokenString);
		//console.log(token.token);
		axios
			.get("http://localhost:5000/api/users/", {
				headers: {
					"x-access-token": token.token,
				},
			})
			.then((respuesta) => {
				const usuarios = respuesta.data;
				console.log(usuarios);
				this.setState({ usuarios });
			});
	}

	borrarRegistroUsuario = (id) => {
		const tokenString = localStorage.getItem("token");
		const token = JSON.parse(tokenString);
		swal({
			title: "Desea borrar el usuario?",
			text: "El usuario va a hacer borrado y no podrá recuperarse.!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				axios
					.delete("http://localhost:5000/api/users/"+id, {
						headers: {
							"x-access-token": token.token,
						},
					})
					.then((respuesta) => {
						this.cargarDatosUsuarios();
					});
				swal("El usuario fué borrado!");
			} else {
				swal("El usuario no fúe eliminado!");
				this.cargarDatosUsuarios();
			}
		});
	};

	componentDidMount() {
		this.cargarDatosUsuarios();
	}

	render() {
		const { usuarios } = this.state;
		if (!usuarios) {
			return <div>Cargando...</div>;
		} else {
			return (
				<div className="card border-info mb-3">
					<div className="card-header">
						<Link className="btn btn-info" to={"/crearu"}>
							Nuevo Usuario
						</Link>
					</div>
					<div className="card-body">
						<h4>Lista de Usuarios</h4>
						<table className="table">
							<thead>
								<tr>
									{/* <th>ID</th> */}
									<th>Nombre</th>
									<th>Correo</th>
									<th>Rol</th>
									<th>Acciones</th>
								</tr>
							</thead>
							<tbody>
								{usuarios?.map((usuario) => (
									<tr key={usuario._id}>
										{/* <td>{usuario._id}</td> */}
										<td>{usuario.username}</td>
										<td>{usuario.email}</td>
										<td>{usuario.roles.name}</td>
										<td>
											<div className="btn-group" role="group" aria-label="">
												<Link
													className="btn btn-outline-primary"
													to={"/editaru/" + usuario._id}
												>
													Editar
												</Link>
												<button
													type="button"
													className="btn btn-outline-danger"
													onClick={() =>
														this.borrarRegistroUsuario(usuario._id)
													}
												>
													Borrar
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<div className="card-footer text-muted"></div>
				</div>
			);
		}
	}
}

export default ListarUsuarios;

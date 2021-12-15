import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert";

class ListarProyectos extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			datosCargados: false,
			proyectos: [],
		};
	}

	cargarDatos() {
		axios.get("http://localhost:5000/api/projects/").then((respuesta) => {
			const proyectos = respuesta.data;
			this.setState({ proyectos });
		});
	}

	borrarRegistro = (id) => {
		swal({
			title: "Desea borrar el proyecto?",
			text: "El proyecto va a hacer borrado y no podrá recuperarse.!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				axios
					.delete("http://localhost:5000/api/projects/" + id)
					.then((respuesta) => {
						this.cargarDatos();
					});
				swal("El proyecto fué borrado!");
			} else {
				swal("El proyecto no fúe eliminado!");
				this.cargarDatos();
			}
		});
	};

	componentDidMount() {
		this.cargarDatos();
	}

	render() {
		const { proyectos } = this.state;
		if (!proyectos) {
			return <div>Cargando...</div>;
		} else {
			return (
				<div className="card">
					<div className="card-header">
						<Link className="btn btn-primary" to={"/crearp"}>
							Nuevo proyecto
						</Link>
					</div>
					<div className="card-body">
						<h4>Lista de Proyectos</h4>
						<table className="table">
							<thead>
								<tr>
									{/* <th>ID</th> */}
									<th>Nombre</th>
									<th>Descripción</th>
									<th>Fecha Creación</th>
									<th>Acciones</th>
								</tr>
							</thead>
							<tbody>
								{proyectos?.map((proyecto) => (
									<tr key={proyecto._id}>
										{/* <td>{proyecto._id}</td> */}
										<td>{proyecto.name}</td>
										<td>{proyecto.description}</td>
										<td>{proyecto.createdAt}</td>
										<td>
											<div className="btn-group" role="group" aria-label="">
												<Link className="btn btn-outline-primary" to={"/editar"}>
													Editar
												</Link>
												<button
													type="button"
													className="btn btn-outline-danger"
													onClick={() => this.borrarRegistro(proyecto._id)}
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

export default ListarProyectos;

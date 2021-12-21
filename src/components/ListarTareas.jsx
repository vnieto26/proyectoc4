import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert";

class ListarTareas extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			datosCargados: false,
			tareas: [],
		};
	}

	cargarDatosTareas() {
		axios.get("http://localhost:5000/api/tasks/")
		.then(((respuesta) => {
			const tareas = respuesta.data;
			console.log(tareas)
			this.setState({ tareas });
		}));
	}

	borrarRegistroTarea = (id) => {
		swal({
			title: "Desea borrar la tarea?",
			text: "La tarea va a hacer borrada y no podrá recuperarse.!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				axios
					.delete("http://localhost:5000/api/tasks/" + id)
					.then((respuesta) => {
						this.cargarDatosTareas();
					});
				swal("La tarea fué eliminada!");
			} else {
				swal("La tarea no fúe eliminada!");
				this.cargarDatosTareas();
			}
		});
	};

	componentDidMount() {
		this.cargarDatosTareas();
	}

	render() {
		const { tareas } = this.state;
		if (!tareas) {
			return <div>Cargando...</div>;
		} else {
			return (
				<div className="card border-success mb-3">
					<div className="card-header">
						<Link className="btn btn-success" to={"/creart"}>
							Nueva tarea
						</Link>
					</div>
					<div className="card-body">
						<h4>Lista de Tareas</h4>
						<table className="table">
							<thead>
								<tr>
									{/* <th>ID</th> */}
									<th>Nombre</th>
									<th>Estado</th>
									<th>Proyecto</th>
									<th>Usuario</th>
									<th>Fecha Creación</th>
									<th>Acciones</th>
								</tr>
							</thead>
							<tbody>
								{tareas?.map((tarea) => (
									<tr key={tarea._id}>
										{/* <td>{tarea._id}</td> */}
										<td>{tarea.task}</td>
										<td>{tarea.state}</td>
										<td>{tarea.projectId.name}</td>
										<td>{tarea.userId.username}</td>
										<td>{tarea.createdAt}</td>
										<td>
											<div className="btn-group" role="group" aria-label="">
												<Link className="btn btn-outline-success" to={"/editart/"+tarea._id}>
													Editar
												</Link>
												<button
													type="button"
													className="btn btn-outline-danger"
													onClick={() => this.borrarRegistroTarea(tarea._id)}
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

export default ListarTareas;

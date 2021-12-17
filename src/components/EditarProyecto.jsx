import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function EditarProyecto(props) {
	const [proyectoe, setProyectoe] = useState({ name: "", description: "" });
	
	const { id } = useParams();

	function cambiarValorP(event) {
		const { name, value } = event.target;
		setProyectoe({ ...proyectoe, [name]: value });
	}

	function enviarDatosProy(event) {
		event.preventDefault();
		const datos = { name: proyectoe.name, description: proyectoe.description };
		axios
			.put(`http://localhost:5000/api/projects/${id}`, datos)
			.then((response) => setProyectoe(response.data.updatedAt));
			window.location = "/proyectos"
	}

	const url = `http://localhost:5000/api/projects/${id}`;
	useEffect(() => {
		axios
			.get(url)
			.then((response) => {
				console.log(response.data);
				setProyectoe(response.data);
			})
			.catch((e) => console.log(e));
	}, [url]);

	return (
		<div className="card">
			<div className="card-header">
				<h4> Editar Proyecto</h4>
			</div>
			<div className="card-body">
				<form onSubmit={enviarDatosProy}>
					<div className="form-group">
						<label htmlFor="">Nombre del proyecto</label>
						<input
							value={proyectoe.name}
							name="name"
							onChange={cambiarValorP}
							className="form-control"
							required
							aria-describedby="helpId"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="">Descripción del proyecto</label>
						<textarea
							value={proyectoe.description}
							className="form-control rounded-0"
							name="description"
							onChange={cambiarValorP}
							required
							rows="10"
						></textarea>
					</div>
					<div className="btn-group" role="group" aria-label="">
						<button type="submit" className="btn btn-success">
							Actualizar Proyecto
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

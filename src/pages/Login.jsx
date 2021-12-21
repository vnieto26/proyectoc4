import { Container, Row, Col, Button } from "react-bootstrap";
import "./css/loginpage.css";
import React, { useState } from "react";
import PropTypes from "prop-types";

async function loginUser(credentials) {
	return fetch("http://localhost:5000/api/auth/signin", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(credentials),
	}).then((data) => data.json());
}

export default function Login({ setToken }) {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const token = await loginUser({
			email,
			password,
		});
		setToken(token);
	};

	return (
		<>
			<Container className=" w-75 mt-5 rounded shadow-lg mb-5 bg-body rounded">
				<Row className="mt-4 border border-dark border-2 aling-items-stretch">
					<div className="col bg text-center img-fluid d-none d-lg-block"></div>
					<Col className="my-5 bg-white ">
						<div
							style={{ maxWidth: "500px", height: "500px" }}
							className="mx-auto py-5 text-center  mb-5"
						>
							<h2 className="fw-bold">Bienvenid@ </h2>
							<p className="fw-bold">
								¡Gestiona tu tiempo, mejora tu proactividad!
							</p>
							<form onSubmit={handleSubmit}>
								<div className="mb-4">
									<label htmlFor="email" className="form-label">
										Correo electrónico
									</label>
									<input
										type="email"
										className="form-control"
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
								<div className="mb-4">
									<label htmlFor="password" className="form-label">
										Contraseña
									</label>
									<input
										type="password"
										className="form-control"
										onChange={(e) => setPassword(e.target.value)}
									/>
								</div>
								<div className="mb-4">
									<input
										type="checkbox"
										className="form-check-input"
										name="connected"
									/>
									<label htmlFor="connected" className="form-check-label mx-2">
										Mantenerme conectado
									</label>
								</div>
								<Button type="submit" className="mt-2 m-4">
									Iniciar sesión
								</Button>
							</form>
						</div>
					</Col>
				</Row>
			</Container>
		</>
	);
}
Login.propTypes = {
	setToken: PropTypes.func.isRequired,
};

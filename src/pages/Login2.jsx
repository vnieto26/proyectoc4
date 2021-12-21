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
		<div className="container mt-5">
			<div className="row d-flex justify-content-center">
				<div className="card col-lg-4">
					<div className="card-header">
						<h2 className="text-info">Inicio de sesión</h2>
					</div>
					<div className="card-body">
						<form className="form-floating" onSubmit={handleSubmit}>
							<div className="form-floating mb-3">
								<input
									className="form-control"
									type="email"
									onChange={(e) => setEmail(e.target.value)}
								/>
								<label htmlFor="floatingInput">Correo Electrónico</label>
							</div>
							<div className="form-floating mb-3">
								<input
									className="form-control"
									type="password"
									onChange={(e) => setPassword(e.target.value)}
								/>
								<label htmlFor="floatingPassword">Contraseña</label>
							</div>

							<div className="form-floating mb-3">
								<button type="submit" className="btn btn-info">
									Confirmar
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

Login.propTypes = {
	setToken: PropTypes.func.isRequired,
};

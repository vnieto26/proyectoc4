const Formularios = () => {
	return (
		<div>
			<h1 className="mb-3">Formularios</h1>
			<form className="form-floating">
				<div className="form-floating mb-3">
					<input
						type="email"
						className="form-control"
						id="floatingInput"
						placeholder="name@example.com"
					/>
					<label htmlFor="floatingInput">Email address</label>
				</div>

				<div className="form-floating mb-3">
					<input
						type="password"
						className="form-control"
						id="floatingPassword"
						placeholder="Password"
					/>
					<label htmlFor="floatingPassword">Password</label>
				</div>

				<div className="form-floating mb-3">
					<input
						type="password"
						className="form-control"
						id="floatingRptPassword"
						placeholder="Repeat Password"
					/>
					<label htmlFor="floatingRptPassword">Repeat Password</label>
				</div>

				<div className="input-group mb-3">
					<span className="input-group-text" id="basic-addon3">
						https://example.com/users/
					</span>
					<input
						type="text"
						className="form-control"
						id="basic-url"
						aria-describedby="basic-addon3"
					/>
				</div>
				<div className="form-floating mb-3">
					<button type="submit" className="btn btn-primary">
						Confirm
					</button>
				</div>
			</form>
		</div>
	);
};

export default Formularios;

import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function NavBar() {
	return (
		<Navbar collapseOnSelect expand="lg" variant="dark" bg="dark">
			<Navbar.Brand as={NavLink} to={"/"} className="mx-4">
				Gestor de Proyectos
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" className="mx-4" />
			<Navbar.Collapse id="responsive-navbar-nav ">
				<Nav className="me-auto ">
					<Nav.Link as={NavLink}  to={"/proyectos"} className="mx-4">
						Proyectos
					</Nav.Link>
					<Nav.Link as={NavLink}  to={"/tareas"} className="mx-4">
						Tareas
					</Nav.Link>
					<Nav.Link as={NavLink}  to={"/usuarios"} className="mx-4">
						Usuarios
					</Nav.Link>
				</Nav>
				<Nav>
					<Nav.Link as={NavLink}  to={"/cerrar"} className="mx-4">
						Cerrar Sesión
					</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}

// import React from "react";
// import { Link } from "react-router-dom";

// export default function NavBar() {
// 	return (
// 		<div className="container">
// 			<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
// 				<div className="nav navbar-nav">
// 					<Link className="nav-item nav-link active" to={"/"}>
// 						Sistema
// 					</Link>
// 					<Link className="nav-item nav-link" to={"/proyectos"}>
// 						Proyectos
// 					</Link>
// 					<Link className="nav-item nav-link" to={"/tareas"}>
// 						Tareas
// 					</Link>
// 					<Link className="nav-item nav-link" to={"/usuarios"}>
// 						Usuarios
// 					</Link>
// 					<Link className="nav-item nav-link d-flex"  to={"/cerrar"}>
// 						Cerrar Sesión
// 					</Link>
// 				</div>
// 			</nav>
// 		</div>
// 	);
// }

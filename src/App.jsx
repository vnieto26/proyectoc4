import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import ListarProyectos from "./components/ListarProyectos";
import ListarUsuarios from "./components/ListarUsuarios";
import ListarTareas from "./components/ListarTareas";
import CrearProyecto from "./components/CrearProyecto";
import CrearUsuario from "./components/CrearUsuario";
import CrearTarea from "./components/CrearTarea";
import EditarProyecto from "./components/EditarProyecto";
import Inicio from "./components/Inicio";
import EditarUsuario from "./components/EditarUsuario";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
	return (
		<Router>
			<nav className="navbar navbar-expand navbar-light bg-light">
				<div className="nav navbar-nav">
					<Link className="nav-item nav-link active" to={"/"}>
						Sistema
					</Link>
					<Link className="nav-item nav-link" to={"/proyectos"}>
						Proyectos
					</Link>
					<Link className="nav-item nav-link" to={"/tareas"}>
						Tareas
					</Link>
					<Link className="nav-item nav-link" to={"/usuarios"}>
						Usuarios
					</Link>
				</div>
			</nav>
			<div className="container">
				<br></br>
				<Routes>
					<Route path="/" element={<Inicio />}></Route>
					<Route exact path="/proyectos" element={<ListarProyectos />}></Route>
					<Route path="/crearp" element={<CrearProyecto />}></Route>
					<Route path="/usuarios" element={<ListarUsuarios />}></Route>
					<Route path="/crearu" element={<CrearUsuario />}></Route>
					<Route path="/tareas" element={<ListarTareas />}></Route>
					<Route path="/creart" element={<CrearTarea />}></Route>
					<Route path="/editarp/:id" element={<EditarProyecto />}></Route>
					<Route path="/editaru/:id" element={<EditarUsuario />}></Route>
				</Routes>
			</div>
		</Router>
	);
}

export default App;

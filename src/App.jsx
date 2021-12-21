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
import EditarTarea from "./components/EditarTarea";
import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import Cerrar from "./pages/Cerrar"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import useToken from './pages/useToken';

function App() {
	const { token, setToken } = useToken();

	if (!token) {
		return <Login setToken={setToken} />;
	}
	return (
		<Router>
			<NavBar />
			<div className="container">
				<br></br>
				<Routes>
					{/* <Route path="/" element={<Login />}></Route> */}
					<Route path="/" element={<Inicio />}></Route>
					<Route path="/proyectos" element={<ListarProyectos />}></Route>
					<Route path="/crearp" element={<CrearProyecto />}></Route>
					<Route path="/usuarios" element={<ListarUsuarios />}></Route>
					<Route path="/crearu" element={<CrearUsuario />}></Route>
					<Route path="/tareas" element={<ListarTareas />}></Route>
					<Route path="/creart" element={<CrearTarea />}></Route>
					<Route path="/editarp/:id" element={<EditarProyecto />}></Route>
					<Route path="/editaru/:id" element={<EditarUsuario />}></Route>
					<Route path="/editart/:id" element={<EditarTarea />}></Route>
					<Route path="/cerrar" element={<Cerrar />}></Route>
				</Routes>
			</div>
		</Router>
	);
}

export default App;

import "./App.css";
import "./Burger.css";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Navbar from "./Navbar";
import Tasks from "./Tasks";
import Task from "./Task";
import Create from "./Create";
import Admin from "./Admin";
import CreateUser from "./CreateUser";
import User from "./User";

function App() {
	return (
		<Router>
			<div className="App">
				<div className="header">
					<Navbar />
				</div>
				<div className="content">
					<Routes>
						<Route path="*" element={<Home />} />
						<Route path="/tasks" element={<Tasks />} />
						<Route path="/admin" element={<Admin />} />
						<Route path="admin/create-user" element={<CreateUser />} />
						<Route path="/admin/:id" element={<User />} />
						<Route path="/tasks/:id" element={<Task />} />
						<Route path="tasks/create" element={<Create />} />
					</Routes>
				</div>
				<div className="footer"></div>
			</div>
		</Router>
	);
}

export default App;

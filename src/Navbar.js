import { Link, useLocation, useNavigate } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import React, { useState, useEffect } from "react";
import { faBell, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [loggedRole, setLoggedRole] = useState("");
	const [availableTasks, setAvailableTasks] = useState([]);
	const [loggedInName, setLoggedInName] = useState("");
	const [loginBoxClasses, setLoginBoxClasses] = useState("login-container hide");
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");

	const toastId = React.useRef(null);
	const customId = "not-allowed";

	const nav = useNavigate();
	const location = useLocation();

	const showLogin = () => {
		setLoginBoxClasses("login-container");
	};

	const hideLogin = () => {
		setLoginBoxClasses("login-container hide");
	};

	useEffect(() => {
		let loggedIn = sessionStorage.getItem("loggedin");
		let role = sessionStorage.getItem("role");
		let tasks = sessionStorage.getItem("tasks");

		if (loggedIn) setIsLoggedIn(true);
		else setIsLoggedIn(false);

		if (role === "Admin") setLoggedRole("Admin");
		else if (role === "User") setLoggedRole("User");
		else setLoggedRole("");

		if (tasks) setAvailableTasks(tasks);

		console.log("tasks to show: " + availableTasks);

		if (location.pathname !== "/" && !isLoggedIn) {
			nav("/");
		}

		if (location.pathname.includes("/tasks/")) {
			let path = location.pathname;
			let taskToShow = path.replace("/tasks/", "");

			if (loggedRole !== "User" && loggedRole !== "Admin") {
				toast.error("You are not allowed to view this order.");
				nav("/tasks");
			}
			// if (isLoggedIn && !availableTasks.includes(taskToShow) && loggedRole !== "Admin") {
			if (!availableTasks.includes(taskToShow) && loggedRole === "User") {
				toast.error("You are not allowed to view this order.");
				nav("/tasks");
			}
		}
	}, [location]);

	const handleAuth = () => {};

	const handleLogOut = () => {
		toast.warning("You are logged out.");
		setLoggedInName("");
		setIsLoggedIn(false);
		setLoggedRole("");
		setUserName("");
		setPassword("");
		sessionStorage.clear();
		nav("/");
	};

	const handleLogin = () => {
		fetch("http://localhost:8000/users/" + userName, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		})
			.then((res) => {
				if (res.ok) {
					console.log("Ok");
					return res.json();
				} else {
					console.log("Not Ok");
				}
			})
			.then((data) => {
				if (data.id === userName && data.upassword === password) {
					toast.success("Logged in successfully!");
					setLoggedInName(data.id);
					setIsLoggedIn(true);
					setLoggedRole(data.role);
					const arr = data.tasks.split(" ");
					setAvailableTasks(arr);
					sessionStorage.setItem("username", data.id);
					sessionStorage.setItem("loggedin", true);
					sessionStorage.setItem("role", data.role);
					sessionStorage.setItem("tasks", arr);
					setUserName("");
					setPassword("");
					hideLogin();
				} else {
					toast.error("Wrong Username or Password.");
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div>
			<ToastContainer />
			<div className={loginBoxClasses}>
				<div className="close-button" onClick={() => hideLogin()}>
					<FontAwesomeIcon icon={faXmark} className="icon-close" />
				</div>
				<div className="login-row">
					<label> User Name:</label>
					<input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
				</div>
				<div className="login-row">
					<label> Password:</label>
					<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
				</div>
				<button onClick={() => handleLogin()} className="log-button">
					Log In
				</button>
			</div>
			<nav className="navbar" id="full-menu">
				<a href="/">
					<img className="navbar-logo" src="/logo.png" alt="logo" />
				</a>
				<div className="links">
					<div className="link-container">
						<Link className="link" to="">
							Home
						</Link>
					</div>
					{isLoggedIn && (
						<div className="link-container">
							<Link className="link" to="tasks">
								Orders
							</Link>
						</div>
					)}
					{isLoggedIn && loggedRole === "Admin" && (
						<div className="link-container">
							<Link className="link" to="admin">
								Admin
							</Link>
						</div>
					)}
					{isLoggedIn && (
						<div className="link-container">
							<Link className="link" onClick={() => handleLogOut()}>
								Log Out
							</Link>
						</div>
					)}
					{!isLoggedIn && (
						<div className="link-container">
							<Link onClick={() => showLogin()} className="link">
								Log In
							</Link>
						</div>
					)}
				</div>
			</nav>
			<nav className="navbar-mobile" id="burger-menu">
				<Menu right style="overflow: hidden;">
					<Link className="link" to="">
						Home
					</Link>
					<Link className="link" to="tasks">
						Orders
					</Link>
				</Menu>
				<div className="links">
					<a href="/">
						<img className="navbar-logo-mobile" src="/logo.png" alt="logo" />
					</a>
				</div>
			</nav>
		</div>
	);
};
export default Navbar;

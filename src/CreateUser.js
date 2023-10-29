import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useFetch from "./useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { InfinitySpin } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateUser = () => {
	const { error, isPending, data: users } = useFetch("http://localhost:8000/users");

	useEffect(() => {
		if (users != null) {
		}
	}, [users]);

	const [id, setId] = useState("");
	const [userRole, setUserRole] = useState("");
	const [userPassword, setUserPassword] = useState("");
	const [userTasks, setUserTasks] = useState("");
	const [lastModifiedDate, setLastModifiedDate] = useState(new Date().toLocaleDateString());
	// new Date().toLocaleDateString()

	const nav = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();

		var role = userRole;
		var upassword = userPassword;

		var tasks = "";
		if (userRole == "Admin") {
			tasks = "";
		} else if (userRole == "User") {
			tasks = userTasks;
		} else {
			tasks = "";
		}

		const newTask = {
			id,
			role,
			upassword,
			tasks,
			lastModifiedDate,
		};

		fetch("http://localhost:8000/users/", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newTask),
		}).then(() => {
			// nav.go(-1);
			//toast.success("Task created successfully!");
			nav("/admin");
		});
	};

	const handleAddJobButton = () => {};

	const handleCancel = () => {
		nav("/admin");
	};

	return (
		<div className="content-container">
			<ToastContainer />
			{isPending && (
				<div className="spinner-container">
					<InfinitySpin width="200" color="#29aee7" className="spinner" />
				</div>
			)}
			{error && <div>{error}</div>}
			{users && (
				<div className="create">
					<h2 className="page-title">Create New User</h2>
					<form onSubmit={handleSubmit}>
						<div className="task-title">
							<label>User Name - ID:</label>
							<input type="text" required value={id} onChange={(e) => setId(e.target.value)} />
						</div>
						<div className="task-title">
							<label>Password:</label>
							<input
								type="text"
								required
								value={userPassword}
								onChange={(e) => setUserPassword(e.target.value)}
							/>
						</div>
						<div className="task-title">
							<label>Role:</label>
							<select value={userRole} onChange={(e) => setUserRole(e.target.value)}>
								<option value="-">-</option>
								<option value="User">User</option>
								<option value="Admin">Admin</option>
							</select>
						</div>
						{userRole === "User" && (
							<div className="task-title">
								<label>Available Tasks - Tasks IDs separated by space:</label>
								<input
									type="text"
									required
									value={userTasks}
									onChange={(e) => setUserTasks(e.target.value)}
								/>
							</div>
						)}

						<div className="create-buttons-row">
							<button type="button" onClick={() => handleCancel()} className="cancel-task-button">
								Cancel
							</button>
							<button type="sumbit" className="create-task-button">
								Create User
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
};

export default CreateUser;

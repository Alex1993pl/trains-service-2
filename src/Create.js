import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useFetch from "./useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { InfinitySpin } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Create = () => {
	const { error, isPending, data: tasks } = useFetch("http://localhost:8000/tasks");
	const [maxId, setMaxId] = useState(0);

	useEffect(() => {
		if (tasks != null) {
			tasks.map((task) => {
				if (maxId < parseInt(task.id)) {
					console.log(parseInt(task.id));
					setId(parseInt(task.id) + 1);
				}
			});
		}
	}, [tasks]);

	const [id, setId] = useState(0);
	const [orderId, setOrderId] = useState(0);
	const [title, setTitle] = useState("");
	const [lastModifiedDate, setLastModifiedDate] = useState(new Date().toLocaleDateString());
	// new Date().toLocaleDateString()

	const nav = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		let wjazdzestawu = false;
		let demontaz = false;
		let operacja1 = false;

		const newTask = {
			id,
			orderId,
			title,
			wjazdzestawu,
			demontaz,
			operacja1,
			lastModifiedDate,
		};

		fetch("http://localhost:8000/tasks/", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newTask),
		}).then(() => {
			// nav.go(-1);
			//toast.success("Task created successfully!");
			nav("/tasks");
		});
	};

	const handleAddJobButton = () => {};

	const handleCancel = () => {
		nav("/tasks");
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
			{tasks && (
				<div className="create">
					<h2 className="page-title">Create New Task</h2>
					<form onSubmit={handleSubmit}>
						<div className="task-title">
							<label>Order ID:</label>
							<input
								type="text"
								required
								value={orderId}
								onChange={(e) => setOrderId(e.target.value)}
							/>
						</div>
						<div className="task-title">
							<label>Title:</label>
							<input
								type="text"
								required
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</div>
						{/* <div className="task-title">
							<label>Type:</label>
							<select value={type} onChange={(e) => setType(e.target.value)}>
								<option value="Default">Default</option>
								<option value="Assembly">Assembly</option>
								<option value="Repair">Repair</option>
							</select>
						</div>

						<div className={job1Class}>
							<div className="job-inner">
								<label>Job:</label>
								<input
									required
									type="text"
									value={job1}
									onChange={(e) => setJob1(e.target.value)}
								/>
							</div>
						</div> */}

						<div className="create-buttons-row">
							<button type="button" onClick={() => handleCancel()} className="cancel-task-button">
								Cancel
							</button>
							<button type="sumbit" className="create-task-button">
								Create Task
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
};

export default Create;

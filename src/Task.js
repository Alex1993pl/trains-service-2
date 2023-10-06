import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "./useFetch";
import ReactSwitch from "react-switch";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InfinitySpin } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Tasks = () => {
	const { id } = useParams();
	const nav = useNavigate();
	const { data: task, error, isPending } = useFetch("http://localhost:8000/tasks/" + id);

	useEffect(() => {
		if (task) {
			setWjazdzestawu(task.wjazdzestawu);
			setDemontaz(task.demontaz);
			setOperacja1(task.operacja1);
		}
	}, [task]);

	const [wjazdzestawu, setWjazdzestawu] = useState(false);
	const [wjazdzestawuClasses, setWjazdzestawuClasses] = useState("update-job");
	const [demontaz, setDemontaz] = useState(false);
	const [demontazClasses, setDemontazClasses] = useState("update-job job-hidden");
	const [operacja1, setOperacja1] = useState(false);
	const [operacja1Classes, setOperacja1Classes] = useState("update-job job-hidden");

	const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

	const handleCancel = () => {
		nav("/tasks");
	};

	const handleDelete = () => {
		fetch("http://localhost:8000/tasks/" + task.id, {
			method: "DELETE",
		}).then(() => {
			// toast.success("Task deleted successfully!");
			nav("/tasks");
		});
	};

	const handleProcess = () => {
		if (wjazdzestawu) {
			setDemontazClasses("update-job");
		} else {
			setDemontazClasses("update-job job-hidden");
		}

		if (demontaz) {
			setWjazdzestawuClasses("update-job job-locked");
			setOperacja1Classes("update-job");
		} else {
			setWjazdzestawuClasses("update-job");
			setOperacja1Classes("update-job job-hidden");
			return;
		}

		if (operacja1) {
			setDemontazClasses("update-job job-locked");
		} else {
			setDemontazClasses("update-job");
		}
	};

	useEffect(() => {
		handleProcess();
	}, [task, wjazdzestawu, demontaz, operacja1]);

	const handleClick = async (e) => {
		e.preventDefault();
		// if (
		// 	job1Status == task.job1Status &&
		// 	job2Status == task.job2Status &&
		// 	job3Status == task.job3Status &&
		// 	job4Status == task.job4Status &&
		// 	job5Status == task.job5Status
		// ) {
		// 	toast.warning("No changes made!");
		// 	return;
		//}
		if (true) {
			task.wjazdzestawu = wjazdzestawu;
			task.demontaz = demontaz;
			task.operacja1 = operacja1;
			task.lastModifiedDate = new Date().toLocaleDateString();

			fetch("http://localhost:8000/tasks/" + task.id, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(task),
			}).then(() => {
				// toast.success("Task updated successfully!");
				nav("/tasks");
			});
		}
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
			{task && (
				<div className="create">
					<h2 className="page-title">Manage Task</h2>
					<form onSubmit={handleClick}>
						<div className="task-title">
							<label>Title:</label>
							<h3>{task.title}</h3>
						</div>
						<div className="task-title">
							<label>Order ID:</label>
							<h3>{task.orderId}</h3>
						</div>

						<div className={wjazdzestawuClasses}>
							<div className="job-inner">
								<label>Wjazd Zestawu</label>
								<div className="switch-container">
									<ReactSwitch
										onChange={() => setWjazdzestawu(!wjazdzestawu)}
										checked={wjazdzestawu}
									/>
								</div>
							</div>
						</div>
						<div className={demontazClasses}>
							<div className="job-inner">
								<label>Demontaż</label>
								<div className="switch-container">
									<ReactSwitch onChange={() => setDemontaz(!demontaz)} checked={demontaz} />
								</div>
							</div>
						</div>
						<div className={operacja1Classes}>
							<div className="job-inner">
								<label>Operacja 1</label>
								<div className="switch-container">
									<ReactSwitch onChange={() => setOperacja1(!operacja1)} checked={operacja1} />
								</div>
							</div>
						</div>

						<div className="create-buttons-row">
							<button type="button" onClick={() => handleCancel()} className="cancel-task-button">
								Cancel
							</button>
							<button type="button" onClick={() => handleDelete()} className="delete-task-button">
								Delete
							</button>
							<button type="sumbit" className="create-task-button">
								Update
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
};
export default Tasks;

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
	const [orderNumber, setOrderNumber] = useState("");
	const [clientName, setClientName] = useState("");
	const [title, setTitle] = useState("");
	const [lastModifiedDate, setLastModifiedDate] = useState(new Date().toLocaleDateString());
	// new Date().toLocaleDateString()

	const nav = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		let wjazdZestawu = false;
		let demontazMaznic = false;
		let demontazLozysk = false;
		let czyszczenieZestawu = false;
		let czyszczenieMaznic = false;
		let czyszczenieLozysk = false;
		let kolaBose = "-";
		let os = "-";
		let koloZebate = "-";
		let opdmm1 = false;
		let rzk1 = false;
		let wymienicKolaBose = false;
		let zzk1 = false;
		let opdmm2 = false;
		let rzk2 = false;
		let wymienicOs = false;
		let zzk2 = false;
		let oczyscic = false;
		let rzk3 = false;
		let wymienicKoloZebate = false;
		let zzk3 = false;
		let toczycObrecze = false;

		let weryfikacjaMaznic = "-";
		let pdmonm1 = false;
		let wymienicMaznice = false;
		let pdmonm2 = false;

		let przekazacDoRegeneracji = false;
		let weryfikacjaPoRegeneracji = "-";
		let pdmonm3 = false;
		let reklamacja = false;

		let weryfikacjaLozysk = "-";
		let pdmonm4 = false;
		let wymienicLozyska = false;
		let pdmonm5 = false;

		let kontrolaJakosci = false;
		let montazLozysk = false;
		let montazMaznic = false;
		let malowanie = false;
		let wysylkaDoKlienta = false;

		const newTask = {
			id,
			orderNumber,
			clientName,
			title,
			wjazdZestawu,
			demontazMaznic,
			demontazLozysk,
			czyszczenieZestawu,
			czyszczenieMaznic,
			czyszczenieLozysk,
			lastModifiedDate,
			kolaBose,
			os,
			koloZebate,
			opdmm1,
			rzk1,
			wymienicKolaBose,
			zzk1,
			opdmm2,
			rzk2,
			wymienicOs,
			zzk2,
			oczyscic,
			rzk3,
			wymienicKoloZebate,
			zzk3,
			toczycObrecze,
			weryfikacjaLozysk,
			pdmonm4,
			wymienicLozyska,
			pdmonm5,
			weryfikacjaMaznic,
			pdmonm1,
			wymienicMaznice,
			pdmonm2,
			przekazacDoRegeneracji,
			weryfikacjaPoRegeneracji,
			pdmonm3,
			reklamacja,
			kontrolaJakosci,
			montazLozysk,
			montazMaznic,
			malowanie,
			wysylkaDoKlienta,
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
							<h3>{id}</h3>
						</div>
						<div className="task-title">
							<label>Order Number:</label>
							<input
								type="text"
								required
								value={orderNumber}
								onChange={(e) => setOrderNumber(e.target.value)}
							/>
						</div>
						<div className="task-title">
							<label>Client Name:</label>
							<input
								type="text"
								required
								value={clientName}
								onChange={(e) => setClientName(e.target.value)}
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

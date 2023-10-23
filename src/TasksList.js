import ProgressBar from "@ramonak/react-progress-bar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faFilter,
	faSearch,
	faPlus,
	faMinus,
	faPlusCircle,
	faCalendarXmark,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

const TasksList = ({ tasks }) => {
	const handleDelayNotification = (task) => {
		if (handleTaskProgress(task) == 100) {
			return "";
		}
		var dateNow = moment(new Date());
		var dateThen = moment(task.lastModifiedDate);

		var difference = parseInt(moment.duration(dateNow.diff(dateThen)).asDays());
		console.log("Days difference: " + difference);

		if (difference >= 7) {
			return <FontAwesomeIcon icon={faCalendarXmark} className="icon-notification icon-delay7" />;
		}
		if (difference >= 3) {
			return <FontAwesomeIcon icon={faCalendarXmark} className="icon-notification icon-delay3" />;
		} else {
			return "";
		}
	};
	const handleTaskProgress = (task) => {
		var jobsCounter = 0;
		var completedJobsCounter = 0;
		var progression = 0;

		if (task.wjazdZestawu) {
			jobsCounter++;
			completedJobsCounter++;
		} else {
			jobsCounter++;
		}
		if (task.demontazMaznic) {
			jobsCounter++;
			completedJobsCounter++;
		} else {
			jobsCounter++;
		}
		if (task.demontazLozysk) {
			jobsCounter++;
			completedJobsCounter++;
		} else {
			jobsCounter++;
		}
		if (task.czyszczenieZestawu) {
			jobsCounter++;
			completedJobsCounter++;
		} else {
			jobsCounter++;
		}
		if (task.czyszczenieMaznic) {
			jobsCounter++;
			completedJobsCounter++;
		} else {
			jobsCounter++;
		}
		if (task.czyszczenieLozysk) {
			jobsCounter++;
			completedJobsCounter++;
		} else {
			jobsCounter++;
		}

		if (task.kolaBose === "Dobre") {
			jobsCounter++;
			completedJobsCounter++;
			if (task.opdmm1) {
				jobsCounter++;
				completedJobsCounter++;
			} else {
				jobsCounter++;
			}
		} else if (task.kolaBose === "Zle") {
			jobsCounter++;
			completedJobsCounter++;
			if (task.rzk1) {
				jobsCounter++;
				completedJobsCounter++;
			} else {
				jobsCounter++;
			}
			if (task.wymienicKolaBose) {
				jobsCounter++;
				completedJobsCounter++;
			} else {
				jobsCounter++;
			}
			if (task.zzk1) {
				jobsCounter++;
				completedJobsCounter++;
			} else {
				jobsCounter++;
			}
		} else {
			jobsCounter = jobsCounter + 4;
		}

		if (task.os === "Dobre") {
			jobsCounter++;
			completedJobsCounter++;
			if (task.opdmm2) {
				jobsCounter++;
				completedJobsCounter++;
			} else {
				jobsCounter++;
			}
		} else if (task.os === "Zle") {
			jobsCounter++;
			completedJobsCounter++;
			if (task.rzk2) {
				jobsCounter++;
				completedJobsCounter++;
			} else {
				jobsCounter++;
			}
			if (task.wymienicOs) {
				jobsCounter++;
				completedJobsCounter++;
			} else {
				jobsCounter++;
			}
			if (task.zzk2) {
				jobsCounter++;
				completedJobsCounter++;
			} else {
				jobsCounter++;
			}
		} else {
			jobsCounter = jobsCounter + 4;
		}

		if (task.koloZebate === "Dobre") {
			jobsCounter++;
			completedJobsCounter++;
			if (task.oczyscic) {
				jobsCounter++;
				completedJobsCounter++;
			} else {
				jobsCounter++;
			}
		} else if (task.koloZebate === "Zle") {
			jobsCounter++;
			completedJobsCounter++;
			if (task.rzk3) {
				jobsCounter++;
				completedJobsCounter++;
			} else {
				jobsCounter++;
			}
			if (task.wymienicKoloZebate) {
				jobsCounter++;
				completedJobsCounter++;
			} else {
				jobsCounter++;
			}
			if (task.zzk3) {
				jobsCounter++;
				completedJobsCounter++;
			} else {
				jobsCounter++;
			}
		} else {
			jobsCounter = jobsCounter + 4;
		}

		if (task.toczycObrecze) {
			jobsCounter++;
			completedJobsCounter++;
		} else {
			jobsCounter++;
		}

		if (task.weryfikacjaMaznic === "Dobre") {
			jobsCounter++;
			completedJobsCounter++;
			if (task.pdmonm1) {
				jobsCounter++;
				completedJobsCounter++;
			} else {
				jobsCounter++;
			}
		} else if (task.weryfikacjaMaznic === "Zle") {
			jobsCounter++;
			completedJobsCounter++;
			if (task.wymienicMaznice) {
				jobsCounter++;
				completedJobsCounter++;
			} else {
				jobsCounter++;
			}
			if (task.pdmonm2) {
				jobsCounter++;
				completedJobsCounter++;
			} else {
				jobsCounter++;
			}
		} else if (task.weryfikacjaMaznic === "Do regeneracji") {
			jobsCounter++;
			completedJobsCounter++;
			if (task.przekazacDoRegeneracji) {
				jobsCounter++;
				completedJobsCounter++;

				if (task.weryfikacjaPoRegeneracji === "Dobre") {
					jobsCounter++;
					completedJobsCounter++;
					if (task.pdmonm3) {
						jobsCounter++;
						completedJobsCounter++;
					} else {
						jobsCounter++;
					}
				} else if (task.weryfikacjaPoRegeneracji === "Zle") {
					jobsCounter++;
					completedJobsCounter++;
					if (task.reklamacja) {
						jobsCounter++;
						completedJobsCounter++;
					} else {
						jobsCounter++;
					}
				} else {
				}
			} else {
				jobsCounter = jobsCounter + 3;
			}
		} else {
			jobsCounter = jobsCounter + 4;
		}

		if (task.weryfikacjaLozysk === "Dobre") {
			jobsCounter++;
			completedJobsCounter++;
			if (task.pdmonm4) {
				jobsCounter++;
				completedJobsCounter++;
			} else {
				jobsCounter++;
			}
		} else if (task.weryfikacjaLozysk === "Zle") {
			jobsCounter++;
			completedJobsCounter++;
			if (task.wymienicLozyska) {
				jobsCounter++;
				completedJobsCounter++;
			} else {
				jobsCounter++;
			}
			if (task.pdmonm5) {
				jobsCounter++;
				completedJobsCounter++;
			} else {
				jobsCounter++;
			}
		} else {
			jobsCounter = jobsCounter + 3;
		}

		if (task.kontrolaJakosci) {
			jobsCounter++;
			completedJobsCounter++;
		} else {
			jobsCounter++;
		}

		if (task.montazLozysk) {
			jobsCounter++;
			completedJobsCounter++;
		} else {
			jobsCounter++;
		}

		if (task.montazMaznic) {
			jobsCounter++;
			completedJobsCounter++;
		} else {
			jobsCounter++;
		}

		if (task.malowanie) {
			jobsCounter++;
			completedJobsCounter++;
		} else {
			jobsCounter++;
		}

		if (task.wysylkaDoKlienta) {
			jobsCounter++;
			completedJobsCounter++;
		} else {
			jobsCounter++;
		}

		progression = parseInt((completedJobsCounter / jobsCounter) * 100);
		return progression;
	};
	const handleTaskProgressColor = (task) => {
		var progress = handleTaskProgress(task);
		var color =
			progress < 25
				? "#f25900"
				: progress < 50
				? "#f28d00"
				: progress < 75
				? "#e6f200"
				: progress < 99
				? "#99f200"
				: "#0cf200";
		return color;
	};
	return (
		<div className="tasks-list">
			<h2 className="page-title-tasks">Orders List</h2>
			<div className="task-preview-head">
				<div className="task-preview-inner row">
					<div className="task-preview-section col-lg-1">
						<h3>ID</h3>
					</div>
					<div className="task-preview-section col-lg-2">
						<h3>Order Number</h3>
					</div>
					<div className="task-preview-section col-lg-2">
						<h3>Client Name</h3>
					</div>
					<div className="task-preview-section col-lg-2">
						<h3>Title</h3>
					</div>
					<div className="task-preview-section col-lg-1">
						<h3>Last modified</h3>
					</div>
					<div className="task-preview-section col-lg-2">
						<h3>Progress</h3>
					</div>
					<div className="task-preview-section col-lg-1">
						<h3>Notifications</h3>
					</div>
				</div>
			</div>
			{tasks.map((task) => (
				<div className="task-preview" key={task.id}>
					<Link className="task-preview-inner row" to={`/tasks/${task.id}`}>
						<div className="task-preview-section col-lg-1">
							<h2>{task.id}</h2>
						</div>
						<div className="task-preview-section col-lg-2">{task.orderNumber}</div>
						<div className="task-preview-section col-lg-2">{task.clientName}</div>
						<div className="task-preview-section col-lg-2">{task.title}</div>
						<div className="task-preview-section col-lg-1">{task.lastModifiedDate}</div>
						<div className="task-preview-section col-lg-2">
							<ProgressBar
								className="progress-bar"
								completed={handleTaskProgress(task)}
								bgColor={handleTaskProgressColor(task)}
								barContainerClassName="bar-container"
							/>
						</div>
						<div className="task-preview-section col-lg-1">{handleDelayNotification(task)}</div>
					</Link>
				</div>
			))}
			<div className="task-preview">
				<Link className="task-preview-inner row" to="/tasks/create">
					<div className="task-preview-section col-lg-12 create-new-task">
						<FontAwesomeIcon icon={faPlusCircle} className="icon-create" />
						<h2>Create New Order</h2>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default TasksList;

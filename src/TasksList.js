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
			<h2 className="page-title-tasks">Tasks List</h2>
			<div className="task-preview-head">
				<div className="task-preview-inner row">
					<div className="task-preview-section col-lg-1">
						<h3>ID</h3>
					</div>
					<div className="task-preview-section col-lg-2">
						<h3>Order ID</h3>
					</div>
					<div className="task-preview-section col-lg-2">
						<h3>Title</h3>
					</div>
					<div className="task-preview-section col-lg-2">
						<h3>Last modified</h3>
					</div>
					<div className="task-preview-section col-lg-2">
						<h3>Progress</h3>
					</div>
					<div className="task-preview-section col-lg-2">
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
						<div className="task-preview-section col-lg-2">{task.orderId}</div>
						<div className="task-preview-section col-lg-2">{task.title}</div>
						<div className="task-preview-section col-lg-2">{task.lastModifiedDate}</div>
						<div className="task-preview-section col-lg-2">
							<ProgressBar
								className="progress-bar"
								completed={handleTaskProgress(task)}
								bgColor={handleTaskProgressColor(task)}
								barContainerClassName="bar-container"
							/>
						</div>
						<div className="task-preview-section col-lg-2">{handleDelayNotification(task)}</div>
					</Link>
				</div>
			))}
			<div className="task-preview">
				<Link className="task-preview-inner row" to="/tasks/create">
					<div className="task-preview-section col-lg-12 create-new-task">
						<FontAwesomeIcon icon={faPlusCircle} className="icon-create" />
						<h2>Create New Task</h2>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default TasksList;

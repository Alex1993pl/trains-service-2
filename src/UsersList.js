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

const UsersList = ({ users }) => {
	const handleTasks = (user) => {
		var str = "";
		if (user.role === "Admin") {
			str = "ALL";
		} else if (user.role === "User") {
			str = user.tasks;
		} else {
			str = "NONE";
		}
		return str;
	};

	return (
		<div className="tasks-list">
			<h2 className="page-title-tasks">Users List</h2>
			<div className="task-preview-head">
				<div className="task-preview-inner row">
					<div className="task-preview-section col-lg-2">
						<h3>ID</h3>
					</div>
					<div className="task-preview-section col-lg-3">
						<h3>Role</h3>
					</div>
					<div className="task-preview-section col-lg-3">
						<h3>Available Tasks</h3>
					</div>
				</div>
			</div>
			{users.map((user) => (
				<div className="task-preview" key={user.id}>
					<Link className="task-preview-inner row" to={`/admin/${user.id}`}>
						<div className="task-preview-section col-lg-2">
							<h2>{user.id}</h2>
						</div>
						<div className="task-preview-section col-lg-3">{user.role}</div>
						<div className="task-preview-section col-lg-3">{handleTasks(user)}</div>
					</Link>
				</div>
			))}
			<div className="task-preview">
				<Link className="task-preview-inner row" to="/admin/create-user">
					<div className="task-preview-section col-lg-12 create-new-task">
						<FontAwesomeIcon icon={faPlusCircle} className="icon-create" />
						<h2>Create New User</h2>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default UsersList;

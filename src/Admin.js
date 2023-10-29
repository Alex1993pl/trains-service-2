import useFetch from "./useFetch";
import { useEffect, useState } from "react";
import TasksList from "./TasksList";
import { InfinitySpin } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UsersList from "./UsersList";

const Admin = () => {
	const { error, isPending, data: users } = useFetch("http://localhost:8000/users");

	return (
		<div className="tasks-content">
			<ToastContainer />
			{error && <div>{error}</div>}
			{isPending && (
				<div className="spinner-container-2">
					<InfinitySpin width="200" color="#29aee7" className="spinner" />
				</div>
			)}
			{users && <UsersList users={users} />}
		</div>
	);
};
export default Admin;

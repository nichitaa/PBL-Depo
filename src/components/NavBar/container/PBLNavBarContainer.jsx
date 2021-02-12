import React, { useState } from "react";
import { PBLNavBar } from "../../index";
import { useAuth } from "../../../context/AuthContext";
import history from "../../../constants/history";

const PBLNavBarContainer = () => {
	const { currentUser, logout } = useAuth();

	const [error, setError] = useState("");

	const handleLogout = async (e) => {
		setError("");
		try {
			await logout();
			history.push("/login");
			window.location.reload(false);
		} catch {
			setError("Failed to Log Out!");
			alert(error);
		}
	};

	return <PBLNavBar currentUser={currentUser} handleLogout={handleLogout} />;
};
export default PBLNavBarContainer;

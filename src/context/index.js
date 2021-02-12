import React from "react";
import { DBProvider } from "./DBContext";
import { AuthProvider } from "./AuthContext";

export default function AppContext({ children }) {
	return (
		<AuthProvider>
			<DBProvider>{children}</DBProvider>
		</AuthProvider>
	);
}

import React from "react";
import { PBLNavBarContainer, Footer } from "./components";
import useStartup from "./hooks/useStartup";
import Routing from "./constants";

export default function App() {
	useStartup();
	return (
		<>
			<PBLNavBarContainer />
			<Routing />
			<Footer />
		</>
	);
}

import React from "react";
import { Statistics, InfoSection, RecentProjects, Intro } from "./components";

export default function Home() {
	return (
		<>
			<Intro />
			<Statistics />
			<InfoSection />
			<RecentProjects />
			{/*<Team/>*/}
		</>
	);
}

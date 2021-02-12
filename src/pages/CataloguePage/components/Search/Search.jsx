import React, { useEffect, useState } from "react";
import Fuse from "fuse.js";
import { useDB } from "../../../../context/DBContext";
import * as FIELDS from "../../../../constants/fields";

const Search = () => {
	// for fuse live search
	const [search, setSearch] = useState("");
	const { projects, setDisplayedProjects } = useDB();
	// use effect on search bar input field change
	useEffect(() => {
		// searching in allProjects
		const fuse = new Fuse(projects, {
			keys: [FIELDS.TITLE, FIELDS.DESCRIPTION],
		});
		const result = fuse.search(search).map(({ item }) => item); // convert the result to array of objects
		// if there is a result project and the search input field value contains more than 2 characters
		if (search.length > 1 && result.length > 0) {
			setDisplayedProjects((prev) => result); // update the projects to be displayed
		} else {
			// reset to all projects
			setDisplayedProjects(projects);
		}
		// eslint-disable-next-line
	}, [search]);
	return (
		<>
			<div className="search">
				<div>
					<input
						type="text"
						placeholder="Type to search for a project . . ."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
			</div>
		</>
	);
};

export default Search;

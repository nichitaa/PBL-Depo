import React from "react";
import { useDB } from "../../../../context/DBContext";

const Filter = () => {
	const {
		getProjectsByDate,
		getProjectsByYear,
		getProjectsByRating,
	} = useDB();

	return (
		<>
			<div>
				<div className="filter">
					<form>
						<select
							id="select-item"
							onChange={(e) => {
								getProjectsByYear(e.target.value);
							}}
						>
							<option value="all">All Years</option>
							<option value={1}>I</option>
							<option value={2}>II</option>
							<option value={3}>III</option>
							<option value={4}>IV</option>
						</select>
						<select
							id="select-item"
							onChange={(e) => {
								getProjectsByRating(e.target.value);
							}}
						>
							<option value="lowfirst">By Rating</option>
							<option value="highfirst">Ascending</option>
							<option value="lowfirst">Descending</option>
						</select>
						<select
							id="select-item"
							onChange={(e) => {
								getProjectsByDate(e.target.value);
							}}
						>
							<option value="newest">By Date</option>
							<option value="newest">Newest</option>
							<option value="oldest">Oldest</option>
						</select>
					</form>
				</div>
			</div>
		</>
	);
};

export default Filter;

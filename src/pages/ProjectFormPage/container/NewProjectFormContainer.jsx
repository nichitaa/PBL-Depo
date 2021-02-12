import React, { useState } from "react";
import { useDB } from "../../../context/DBContext";
import { Loading } from "../../../components";
import NewProjectForm from "../components/NewProjectForm/NewProjectForm";
import history from "../../../constants/history";
import * as FIELDS from "../../../constants/fields";
import * as ROUTES from "../../../constants/routes";

const NewProjectFormContainer = () => {
	const { addNewProject } = useDB();
	// local states
	const initialState = {
		[FIELDS.TITLE]: "",
		[FIELDS.CARD_DESCRIPTION]: "",
		[FIELDS.DESCRIPTION]: "",
		[FIELDS.PROBLEM_DESCRIPTION]: "",
		[FIELDS.SOLUTION]: "",
		[FIELDS.IMPLEMENTATION]: "",
		[FIELDS.MENTOR_REVIEW]: "",
		[FIELDS.THEORY_DESCRIPTION]: "",
		[FIELDS.YEAR]: "1",
		[FIELDS.IMAGE_URL]: null,
		[FIELDS.REPORT_URL]: null,
		[FIELDS.GITHUB_LINK]: "",
		ImageInputLabel: "Please upload a image",
		ReportInputLabel: "Please upload a pdf report for your project",
		m1: { name: "", role: "" },
		m2: { name: "", role: "" },
		m3: { name: "", role: "" },
		m4: { name: "", role: "" },
		m5: { name: "", role: "" },
		mentorFullName: "",
	};
	const [form, setForm] = useState(initialState);
	const [loading, setLoading] = useState(false);
	const [validated, setValidated] = useState(false);
	const [teamMembersInputs, setTeamMembersInputs] = useState([1]);
	const [teamNr, setTeamNr] = useState(1);

	// HANDLERS
	// on input change
	const onChangeHandler = (e) => {
		const value = e.target.value;
		setForm({
			...form,
			[e.target.name]: value,
		});
	};
	// on image upload
	const onImageChange = (e) => {
		const imageTypes = ["image/jpeg"];
		let selectedImage = e.target.files[0]; // get the first image
		if (selectedImage && imageTypes.includes(selectedImage.type)) {
			// validate, if not jpeg/pgn throw error
			setForm((prev) => ({
				...prev,
				[FIELDS.IMAGE_URL]: selectedImage,
				ImageInputLabel: selectedImage.name,
			})); // update state with new image
			console.log("IMAGE: ", selectedImage);
		} else {
			alert("Please upload a jpeg or png image ");
			setForm((state) => ({
				...state,
				[FIELDS.IMAGE_URL]: null,
				ImageInputLabel: "Please upload a image",
			}));
		}
	};
	// on pdf upload
	const onPdfReportChange = (e) => {
		let pdf = e.target.files[0]; // get the first file
		if (pdf && pdf.type === "application/pdf") {
			setForm((state) => ({
				...state,
				[FIELDS.REPORT_URL]: pdf,
				ReportInputLabel: pdf.name,
			})); // update state with new pdf
			console.log("PDF: ", pdf);
		} else {
			alert("Please upload the report in pdf format!");
			setForm((state) => ({
				...state,
				[FIELDS.REPORT_URL]: null,
				ReportInputLabel: "Please upload a pdf report for your project",
			}));
		}
	};

	const addMemberInput = async (e) => {
		if (teamMembersInputs.length <= 4) {
			setTeamMembersInputs([...teamMembersInputs, teamNr + 1]);
			setTeamNr((nr) => nr + 1);
		}
	};

	const removeMemberInput = async (e) => {
		if (teamNr > 1) {
			const arr = teamMembersInputs.slice(0, -1);
			setForm({ ...form, [`m${teamNr}`]: { name: "", role: "" } }); // clear last team member input
			setTeamMembersInputs(arr);
			setTeamNr((nr) => nr - 1);
		}
	};

	// on form submit
	const onFormSubmit = async (e) => {
		// prevent from refreshing the page
		e.preventDefault();
		const formData = e.currentTarget;
		if (formData.checkValidity() === true) {
			window.scrollTo(0, 0);
			setLoading(true);
			await addNewProject(form);
			setLoading(false);
			setForm({ ...initialState }); // clear form
			setValidated(true);
			history.push(`${ROUTES.CATALOGUE}`);
		} else {
			e.stopPropagation();
			setValidated(true);
		}
	};

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<NewProjectForm
					form={form}
					onChangeHandler={onChangeHandler}
					onImageChange={onImageChange}
					onPdfReportChange={onPdfReportChange}
					onFormSubmit={onFormSubmit}
					loading={loading}
					validated={validated}
					setForm={setForm}
					addMemberInput={addMemberInput}
					teamMembersInputs={teamMembersInputs}
					removeMemberInput={removeMemberInput}
				/>
			)}
		</>
	);
};

export default NewProjectFormContainer;

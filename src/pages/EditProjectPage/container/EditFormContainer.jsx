import React, { useEffect, useState } from "react";
import { useDB } from "../../../context/DBContext";
import * as FIELDS from "../../../constants/fields";
import { db } from "../../../firebase/firebase";
import * as COLLECTIONS from "../../../constants/collections";
import history from "../../../constants/history";
import * as ROUTES from "../../../constants/routes";
import { Loading } from "../../../components";
import EditForm from "../components/EditForm/EditForm";

const EditFormContainer = ({ projectID }) => {
	const { updateProject } = useDB(); // function to update project
	const initialState = {
		ImageInputLabel: "Please upload a image",
		ReportInputLabel: "Please upload a pdf report for your project",
	}; // to get rid of the uncontrolled input error
	const [form, setForm] = useState(initialState);
	const [loading, setLoading] = useState(false);
	const [validated, setValidated] = useState(false);

	useEffect(() => {
		// get the project data once
		const fetchData = () => {
			return db
				.collection(COLLECTIONS.PROJECTS)
				.doc(projectID)
				.get()
				.then((doc) => doc.data()); // return doc.data() object
		};
		fetchData().then((doc) => {
			setForm({
				...doc,
				...initialState,
			});
		});
		// eslint-disable-next-line
	}, [projectID]);

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
		const imageTypes = ["image/png", "image/jpeg"];
		let selectedImage = e.target.files[0]; // get the first image
		if (selectedImage && imageTypes.includes(selectedImage.type)) {
			// validate, if not jpeg/pgn throw error
			// setImg(selectedImage);
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
			// setReport(pdf);
			setForm((state) => ({
				...state,
				[FIELDS.REPORT_URL]: pdf,
				ReportInputLabel: pdf.name,
			})); // update state with new pdf
			console.log("PDF: ", pdf);
		} else {
			alert("Please upload the report in pdf format!");
			// setReport(null);
			setForm((state) => ({
				...state,
				[FIELDS.REPORT_URL]: null,
				ReportInputLabel: "Please upload a pdf report for your project",
			}));
		}
	};
	// on FORM SUBMIT
	const onFormSubmit = async (e) => {
		// prevent from refreshing the page
		e.preventDefault();
		const formData = e.currentTarget;
		if (formData.checkValidity() === true) {
			setLoading(true);
			window.scrollTo(0, 0);
			await updateProject(projectID, form);
			setLoading(false);
			setForm({ ...initialState }); // clear
			setValidated(true);
			history.push(`${ROUTES.CATALOGUE}`);
		} else {
			e.stopPropagation();
			setValidated(true); // display errors if exists
		}
	};

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<EditForm
					form={form}
					onChangeHandler={onChangeHandler}
					onImageChange={onImageChange}
					onPdfReportChange={onPdfReportChange}
					onFormSubmit={onFormSubmit}
					loading={loading}
					validated={validated}
				/>
			)}
		</>
	);
};

export default EditFormContainer;

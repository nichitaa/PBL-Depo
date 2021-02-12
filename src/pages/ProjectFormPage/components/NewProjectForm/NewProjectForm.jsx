import React from "react";
import { Button, ButtonToolbar, Form } from "react-bootstrap";
import * as FIELDS from "../../../../constants/fields";
import { Input, AttachmentInput, SelectInput } from "../../../../components";
import TeamInputs from "../../../../components/ProjectForm/TeamSection/TeamInputs";
import { MdSend } from "react-icons/md";
import { FaUserMinus, FaUserPlus, SiFirebase } from "react-icons/all";

const NewProjectForm = (props) => (
	<div
		className="row justify-content-center"
		data-aos="flip-left"
		data-aos-duration="500"
	>
		<Form
			onSubmit={props.onFormSubmit}
			noValidate
			validated={props.validated}
			className="col-md-6 col-md-offset-4"
			style={{
				background:
					"linear-gradient(80deg, rgba(187,210,197,1) 45%, rgba(83,105,118,1) 100%)",
				padding: "20px",
				border: "3px solid #283747",
				borderRadius: "20px",
				fontFamily: "Montserrat",
				boxShadow: "5px 5px 30px 14px #283747",
			}}
		>
			<div className="row justify-content-center">
				<Form.Label>
					<h1>
						Your PBL Project
						<SiFirebase
							style={{ marginLeft: "10px", marginBottom: "15px" }}
							color="#F9484A"
						/>
					</h1>
				</Form.Label>
			</div>

			<Input
				label="Project Title"
				rows={1}
				maxLength={"22"}
				placeholder={"Project Title, short and informative"}
				name={FIELDS.TITLE}
				value={props.form[FIELDS.TITLE]}
				onChange={props.onChangeHandler}
			/>

			<SelectInput
				label={"Student Year"}
				onChange={props.onChangeHandler}
				name={FIELDS.YEAR}
				value={props.form[FIELDS.YEAR]}
			/>

			<Input
				label="Short Project Description"
				rows={2}
				maxLength={"99"}
				placeholder={"Short Intro for your project card"}
				name={FIELDS.CARD_DESCRIPTION}
				value={props.form[FIELDS.CARD_DESCRIPTION]}
				onChange={props.onChangeHandler}
			/>

			<Input
				label="Project Description"
				rows={7}
				maxLength={"600"}
				placeholder={
					"Describe your project in details, but do not describe tha actal details"
				}
				name={FIELDS.DESCRIPTION}
				value={props.form[FIELDS.DESCRIPTION]}
				onChange={props.onChangeHandler}
			/>

			<Input
				label="Problem Description"
				rows={9}
				maxLength={"800"}
				placeholder={"Describe the problem your project is solving"}
				name={FIELDS.PROBLEM_DESCRIPTION}
				value={props.form[FIELDS.PROBLEM_DESCRIPTION]}
				onChange={props.onChangeHandler}
			/>

			<Input
				label="Your Solution"
				rows={11}
				maxLength={"1000"}
				placeholder={
					"Tell us about the solution you invent, we want more details."
				}
				name={FIELDS.SOLUTION}
				value={props.form[FIELDS.SOLUTION]}
				onChange={props.onChangeHandler}
			/>

			<Input
				label="Implementation"
				rows={13}
				maxLength={"1500"}
				placeholder={
					"How did you implement your solution, so it does what is suppose to, even more details please :)"
				}
				name={FIELDS.IMPLEMENTATION}
				value={props.form[FIELDS.IMPLEMENTATION]}
				onChange={props.onChangeHandler}
			/>

			<Input
				label="Mentor Review"
				placeholder={"Mentor full name"}
				rows={1}
				maxLength={"40"}
				name={FIELDS.MENTOR_FULL_NAME}
				value={props.form[FIELDS.MENTOR_FULL_NAME]}
				onChange={props.onChangeHandler}
			/>

			<Input
				rows={5}
				maxLength={"400"}
				placeholder={
					"Ask your mentor to give you some feedback about your project"
				}
				name={FIELDS.MENTOR_REVIEW}
				value={props.form[FIELDS.MENTOR_REVIEW]}
				onChange={props.onChangeHandler}
			/>

			<Input
				label="GitHub Link"
				rows={1}
				maxLength={"200"}
				placeholder={"We need to see your work"}
				name={FIELDS.GITHUB_LINK}
				value={props.form[FIELDS.GITHUB_LINK]}
				onChange={props.onChangeHandler}
			/>

			<Form.Label> Team Members </Form.Label>
			{props.teamMembersInputs.map((elem) => {
				return (
					<TeamInputs
						name={props.form[`m${elem}`].name}
						namePlaceholder={`Member ${elem} full name`}
						role={props.form[`m${elem}`].role}
						rolePlaceholder={`Member ${elem} team role`}
						// nested shit
						onNameChange={(e) => {
							props.setForm({
								...props.form,
								[`m${elem}`]: {
									...props.form[`m${elem}`],
									name: e.target.value,
								},
							});
						}}
						onRoleChange={(e) => {
							props.setForm({
								...props.form,
								[`m${elem}`]: {
									...props.form[`m${elem}`],
									role: e.target.value,
								},
							});
						}}
						key={elem}
					/>
				);
			})}

			<div className="text-center">
				<Button
					style={{ width: "49%" }}
					variant="outline-dark"
					onClick={props.addMemberInput}
				>
					<FaUserPlus size="1.5rem" />
				</Button>{" "}
				&nbsp;
				<Button
					style={{ width: "49%" }}
					variant="outline-danger"
					onClick={props.removeMemberInput}
				>
					<FaUserMinus size="1.5rem" />
				</Button>
			</div>

			<Form.Label> Attachments </Form.Label>
			{/* image input */}
			<AttachmentInput
				accept={"image/jpeg"}
				onChange={props.onImageChange}
				buttonText={"Upload Image"}
				label={props.form.ImageInputLabel}
				validMessage={"That's a beautiful image!"}
				invalidMessage={"Please upload a jpeg image!"}
			/>

			{/* pdf report input */}
			<AttachmentInput
				accept={"application/pdf"}
				onChange={props.onPdfReportChange}
				buttonText={"Upload Report"}
				label={props.form.ReportInputLabel}
				validMessage={"Thank you for sharing your report!"}
				invalidMessage={"Please upload a pdf report!"}
			/>

			<ButtonToolbar
				className="justify-content-between"
				aria-label="Toolbar with Button groups"
			>
				<Button
					type="submit"
					variant="success"
					disabled={props.loading}
					className="btn-block"
				>
					Send New Project Request <MdSend size="1.5rem" />
				</Button>
			</ButtonToolbar>
		</Form>
	</div>
);

export default NewProjectForm;

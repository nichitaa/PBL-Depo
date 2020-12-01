import React, {useState} from 'react';
import {useDB} from "../../context/DBContext";
import {Loading, AddFormModal} from "../../components";
import * as FIELDS from "../../constants/fields";

const AddFormContainer = ({hideModal}) => {

    const {addNewProject} = useDB();

    // local states
    const initialState = {
        [FIELDS.TITLE]: '',
        [FIELDS.DESCRIPTION]: '',
        [FIELDS.PROBLEM_DESCRIPTION]: '',
        [FIELDS.THEORY_DESCRIPTION]: '',
        [FIELDS.YEAR]: '1',
        [FIELDS.IMAGE_URL]: null,
        [FIELDS.REPORT_URL]: null,
    }
    const [formState, setFormState] = useState(initialState);
    const [loading, setLoading] = useState(false);

    // HANDLERS
    // on input change
    const onChangeHandler = (e) => {
        const value = e.target.value;
        setFormState({
            ...formState,
            [e.target.name]: value
        });
    }
    // on image upload
    const onImageChange = (e) => {
        const imageTypes = ['image/png', 'image/jpeg'];
        let selectedImage = e.target.files[0]; // get the first image
        if (selectedImage && imageTypes.includes(selectedImage.type)) { // validate, if not jpeg/pgn throw error
            setFormState(prev => ({
                ...prev,
                [FIELDS.IMAGE_URL]: selectedImage
            })) // update state with new image
            console.log("IMAGE: ", selectedImage);
        } else {
            alert('Please upload a jpeg or png image ');
            setFormState(state => ({
                ...state,
                [FIELDS.IMAGE_URL]: null}));
        }
    }
    // on pdf upload
    const onPdfReportChange = (e) => {
        let pdf = e.target.files[0]; // get the first file
        if (pdf && pdf.type === 'application/pdf') {
            setFormState(state => ({
                ...state,
                [FIELDS.REPORT_URL]: pdf,})) // update state with new pdf
            console.log("PDF: ", pdf);
        } else {
            alert("Please upload the report in pdf format!")
            setFormState(state => ({
                ...state,
                [FIELDS.REPORT_URL]: null}))
        }
    }
    // clearing the fields
    const clearForm = () => {
        setFormState({...initialState});
    }
    // on form submit
    const onFormSubmit = async (e) => {
        // prevent from refreshing the page
        e.preventDefault()
        if (formState[FIELDS.IMAGE_URL] && formState[FIELDS.REPORT_URL]) {
            setLoading(true)
            await addNewProject(formState)
            hideModal()
            setLoading(false)
            clearForm();
        } else {
            alert('Please Upload a background image and the report in pdf format!')
        }
    }

    return (
        <>
            {
                loading ?
                    <Loading/> :
                    <AddFormModal formState={formState}
                                  onChangeHandler={onChangeHandler}
                                  onImageChange={onImageChange}
                                  onPdfReportChange={onPdfReportChange}
                                  onFormSubmit={onFormSubmit}
                                  hideModal={hideModal}
                                  loading={loading}
                    />
            }
        </>
    );
}

export default AddFormContainer;
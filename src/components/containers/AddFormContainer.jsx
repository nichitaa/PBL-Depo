import React, {useState} from 'react';
import {useDB} from "../../context/DBContext";
import AddFormModal from "../ProjectForm/AddFormModal";
import {SolarSystemLoading} from "react-loadingg";

const LoadingComponent = () => {
    return <div><SolarSystemLoading color="#751fab" site="large"/></div>
}

const AddFormContainer = ({hideModal}) => {

    const {SubmitNewProjectForm} = useDB();

    // local states
    const initialState = {
        projectName: '',
        projectDescription: '',
        projectProblemDescription: '',
        projectTheoryDescription: '',
        projectImageURL: null,
        projectReportURL: null,
        createdAt: null,
    }
    const [formState, setFormState] = useState(initialState);
    const [img, setImg] = useState(null);
    const [report, setReport] = useState(null);
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
            setImg(selectedImage);
        } else {
            alert('Please upload a jpeg or png image ');
            setImg(null);
        }
    }
    // on pdf upload
    const onPdfReportChange = (e) => {
        let pdf = e.target.files[0]; // get the first file
        if (pdf && pdf.type === 'application/pdf') {
            setReport(pdf);
        } else {
            alert("Please upload the report in pdf format!")
            setReport(null);
        }
    }
    // clearing the fields
    const clearForm = () => {
        setFormState({...initialState});
        setImg(null);
        setReport(null);
    }
    // on form submit
    const onFormSubmit = async (e) => {
        // prevent from refreshing the page
        e.preventDefault()
        if (img !== null && report !== null){
            setLoading(true)
            await SubmitNewProjectForm(img, report, formState)
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
                    <LoadingComponent/> :
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
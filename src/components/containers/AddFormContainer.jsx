import React, {useState} from 'react';
import {useDB} from "../../context/DBContext";
import AddFormModal from "../ProjectForm/AddFormModal";
import {Loading} from "../../components";

const AddFormContainer = ({hideModal}) => {

    const {addNewProject} = useDB();

    // local states
    const initialState = {
        title: '',
        description: '',
        problemDescription: '',
        theoryDescription: '',
        year: '1',
        img: null,
        report: null,
    }
    const [formState, setFormState] = useState(initialState);
    // const [img, setImg] = useState(null);
    // const [report, setReport] = useState(null);
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
            setFormState(prev => ({...prev, img: selectedImage,})) // update state with new image
            console.log("IMAGE: ", selectedImage);
        } else {
            alert('Please upload a jpeg or png image ');
            setFormState(state => ({...state, img: null}));
        }
    }
    // on pdf upload
    const onPdfReportChange = (e) => {
        let pdf = e.target.files[0]; // get the first file
        if (pdf && pdf.type === 'application/pdf') {
            setFormState(state => ({...state, report: pdf,})) // update state with new pdf
            console.log("PDF: ", pdf);
        } else {
            alert("Please upload the report in pdf format!")
            setFormState(state => ({...state, report: null}))
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
        if (formState.img && formState.report) {
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
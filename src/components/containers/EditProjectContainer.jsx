import React, {useState, useEffect} from 'react';
import {useDB} from "../../context/DBContext";
import {db} from "../../firebase/firebase";
import * as ROUTES from "../../constants/routes";
import {Loading, EditForm} from "../../components";
import history from "../../constants/history";
import * as COLLECTIONS from "../../constants/collections";
import * as FIELDS from "../../constants/fields";

const EditProjectContainer = ({projectId}) => {

    const {updateProject} = useDB(); // function to update project

    const initialState = {
        [FIELDS.TITLE]: '',
        [FIELDS.DESCRIPTION]: '',
        [FIELDS.PROBLEM_DESCRIPTION]: '',
        [FIELDS.THEORY_DESCRIPTION]: '',
        [FIELDS.YEAR]: '',
        [FIELDS.IMAGE_URL]: null,
        [FIELDS.REPORT_URL]: null
    } // to get rid of the uncontrolled input error
    const [formState, setFormState] = useState(initialState);
    // const [img, setImg] = useState(null);
    // const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // get the project data once
        const fetchData = async () => {
            const data = await db.collection(COLLECTIONS.PROJECTS)
                .doc(projectId)
                .get()
            await setFormState({
                [FIELDS.TITLE]: data.data()[FIELDS.TITLE],
                [FIELDS.DESCRIPTION]: data.data()[FIELDS.DESCRIPTION],
                [FIELDS.PROBLEM_DESCRIPTION]: data.data()[FIELDS.PROBLEM_DESCRIPTION],
                [FIELDS.THEORY_DESCRIPTION]: data.data()[FIELDS.THEORY_DESCRIPTION],
                [FIELDS.YEAR]: data.data()[FIELDS.YEAR],
            })
        }
        fetchData().then();
    }, [projectId])

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
            // setImg(selectedImage);
            setFormState(prev => ({
                ...prev,
                [FIELDS.IMAGE_URL]: selectedImage,})) // update state with new image
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
            // setReport(pdf);
            setFormState(state => ({
                ...state,
                [FIELDS.REPORT_URL]: pdf
            })) // update state with new pdf
            console.log("PDF: ", pdf);
        } else {
            alert("Please upload the report in pdf format!")
            // setReport(null);
            setFormState(state => ({
                ...state,
                [FIELDS.REPORT_URL]: null
            }))
        }
    }
    // on FORM SUBMIT
    const onFormSubmit = async (e) => {
        // prevent from refreshing the page
        e.preventDefault()
        if (formState[FIELDS.IMAGE_URL] && formState[FIELDS.REPORT_URL]) {
            setLoading(true) // set the loading screen
            // show loading for 4 seconds (until the projects is updated)
            setTimeout(async () => {
                await updateProject(projectId, formState) // wait until data is updated
                setLoading(false)
                history.push(`${ROUTES.CATALOGUE}`) // redirect to catalogue
                window.location.reload(false);
            }, 0) // by default the updating to our collection will be > 2 seconds so that we
            // dont need to add another value to timeout time
        } else {
            alert('Please upload Image and Report!')
        }
    }

    // if not loading screen then render the edit form component
    // else render the loading screen
    return (
        <>
            {
                loading ?
                    (<Loading className="container-fluid"/>) :
                    <EditForm formState={formState}
                              onChangeHandler={onChangeHandler}
                              onImageChange={onImageChange}
                              onPdfReportChange={onPdfReportChange}
                              onFormSubmit={onFormSubmit}
                              loading={loading}/>
            }
        </>
    );
}

export default EditProjectContainer;
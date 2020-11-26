import React, {useState, useEffect} from 'react';
import {useDB} from "../../context/DBContext";
import EditForm from "../ProjectForm/EditForm";
import {db} from "../../firebase/firebase";
import * as ROUTES from "../../constants/routes";
import Loading from "../LoadingSpiner/Loading";
import history from "../../constants/history";

const EditProjectContainer = ({projId}) => {

    const {updateProject} = useDB(); // function to update project

    const initialState = {
        title: '',
        description: '',
        problemDescription: '',
        theoryDescription: '',
        img: null,
        report: null
    } // to get rid of the uncontrolled input error
    const [formState, setFormState] = useState(initialState);
    // const [img, setImg] = useState(null);
    // const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // get the project data once
        const fetchData = async () => {
            const data = await db.collection('ProjectForm')
                .doc(projId).get()
            await setFormState({
                title: data.data().projectName,
                description: data.data().projectDescription,
                problemDescription: data.data().projectProblemDescription,
                theoryDescription: data.data().projectTheoryDescription,
            })
        }
        fetchData().then();
    }, [])

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
            // setReport(pdf);
            setFormState(state => ({...state, report: pdf,})) // update state with new pdf
            console.log("PDF: ", pdf);
        } else {
            alert("Please upload the report in pdf format!")
            // setReport(null);
            setFormState(state => ({...state, report: null}))
        }
    }
    // on FORM SUBMIT
    const onFormSubmit = async (e) => {
        // prevent from refreshing the page
        e.preventDefault()
        if (formState.img && formState.report) {
            setLoading(true) // set the loading screen
            // show loading for 4 seconds (until the projects is updated)
            setTimeout(async () => {
                await updateProject(projId, formState) // wait until data is updated
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
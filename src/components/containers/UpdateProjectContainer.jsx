import React, {useState, useEffect} from 'react';
import {useDB} from "../../context/DBContext";
import EditForm from "../ProjectForm/EditForm";
import {db} from "../../firebase/firebase";
import {useHistory} from 'react-router-dom';
import * as ROUTES from "../../constants/routes";
import { MeteorRainLoading  } from 'react-loadingg';

const LoadingComponent = () => {
    return <div><MeteorRainLoading color="#db150b" size="large"/></div>
}

const UpdateProjectContainer = ({projId}) => {

    const {UpdateProjectForm} = useDB(); // function to update project
    const history = useHistory(); // for redirecting back to project page when done

    const initialState = {
        projectName: '',
        projectDescription: '',
        projectProblemDescription: '',
        projectTheoryDescription: '',
        projectImageURL: null,
        projectReportURL: null,
        createdAt: null,
    } // to get rid of the uncontrolled input error
    const [formState, setFormState] = useState(initialState);
    const [img, setImg] = useState(null);
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // get the project data once
        const fetchData = async () => {
            const data = await db.collection('ProjectForm')
                .doc(projId).get()
            setFormState(data.data())
        }
        fetchData();
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
            setImg(selectedImage);
            console.log("selected image props: ", selectedImage)
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
            console.log("selected pdf props: ", pdf)
        } else {
            alert("Please upload the report in pdf format!")
            setReport(null);
        }
    }
    // on FORM SUBMIT
    const onFormSubmit = async (e) => {
        // prevent from refreshing the page
        e.preventDefault()
        if (img !== null && report !== null){
            setLoading(true) // set the loading screen
            // show loading for 4 seconds (until the projects is updated)
            setTimeout(async () => {
                await UpdateProjectForm(projId, img, report, formState) // wait until data is updated
                setLoading(false)
                history.push(`${ROUTES.CATALOGUE}/${projId}`) // redirect ot project profile page
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
                    (<LoadingComponent className="container-fluid"/>) :
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

export default UpdateProjectContainer;
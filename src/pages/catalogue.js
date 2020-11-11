import React, {useState} from 'react';
import {FiFilter} from "react-icons/fi";
import {Button, Modal} from "react-bootstrap";
import {useDB} from "../context/DBContext";
import {CardGrid, FilterModal} from "../components";

export default function Catalogue() {

    const { displayedProjects } = useDB();

    const [showFilter, setShowFilter] = useState(false);

    return (
        <>
            <div className="d-flex">
                <div className="p-2 w-100 ml-5 text-center"><h1>PBL Catalogue</h1></div>
                <div className="p-2 flex-shrink-1 mr-5">
                    <Button variant="light"
                            onClick={() => setShowFilter(!showFilter)}
                    >
                        <FiFilter color="purple" size="2rem"/>
                        <br/>
                        <p>Filter</p>
                    </Button>
                </div>
            </div>

            <Modal show={showFilter}
                   onHide={() => setShowFilter(false)}
            > <FilterModal/>
            </Modal>
            <CardGrid projects={displayedProjects}/>
        </>
    )
}
import React, { useState } from 'react';
import { FiFilter } from "react-icons/fi";
import { Modal } from "react-bootstrap";
import { FilterModal } from "../index";
import s from './css/styles.module.css'

const Filter = () => {
    const [showFilter, setShowFilter] = useState(false);
    return (
        <>
            <button className={s.filter_button} onClick={() => setShowFilter(!showFilter)}>
                <FiFilter color="purple" size="2rem"/>
            </button>
            <Modal show={showFilter} onHide={() => setShowFilter(false)}>
                <FilterModal/>
            </Modal>
        </>
    )
}

export default Filter;
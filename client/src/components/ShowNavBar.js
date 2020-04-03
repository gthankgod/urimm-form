import React, { Fragment } from 'react'
import { Navbar } from 'react-bootstrap'

const ShowNavBar = () => {
    return (
        <Fragment>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">
                URIMM QUESTION BANK PORTAL
                </Navbar.Brand>
            </Navbar>
        </Fragment>
    )
}

export default ShowNavBar

import React, { Fragment } from 'react'
import { Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ShowNavBar = () => {
    return (
        <Fragment>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>
                    <Link to="/" className="text-white"> Urimm Question Bank </Link>
                </Navbar.Brand>
            </Navbar>
        </Fragment>
    )
}

export default ShowNavBar

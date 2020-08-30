import React from 'react'
import { Link } from 'react-router-dom'
import { Jumbotron } from 'react-bootstrap'

const Success = () => {
    return (
             <Jumbotron className="mt-4">
                <h1>Exam Succesfully Uploaded</h1>
                <p>
                    For more info on how to add more features to this question bank, reach out to admin@urimmng.com
                </p>
                <p>
                    <Link variant="primary" to="/">Add New Exam</Link>
                </p>
            </Jumbotron>
    )
}

export default Success

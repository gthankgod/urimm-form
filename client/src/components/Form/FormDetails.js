import React, { useContext, Fragment } from 'react'
import { Card } from 'react-bootstrap'
import { ExamContext } from '../../context/ExamContextProvider'


const FormDetails = () => {
    const { exam } = useContext(ExamContext);
    return (
        <Fragment>
            <Card>
                <Card.Body>
                    <Card.Title>{exam.subject}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{exam.year}</Card.Subtitle>
                    <Card.Text> Category: { exam.category}</Card.Text>
                    <Card.Text> Number of questions : { exam.numberofquestions}</Card.Text>
                </Card.Body>
            </Card>
        </Fragment>
    )
}

export default FormDetails

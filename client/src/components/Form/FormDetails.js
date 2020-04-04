import React, { useContext, Fragment } from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import { ExamContext } from '../../context/ExamContextProvider'


const FormDetails = () => {
    const { exam } = useContext(ExamContext);
    return (
        <Fragment>
            <Card>
                <Card.Body>
                    <Card.Title>{exam.subject}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{exam.category}</Card.Subtitle>
                    <Row>
                        <Col>
                            <Card.Text> Type: { exam.type}</Card.Text>
                            <Card.Text> Year: { exam.year }</Card.Text>
                        </Col>
                        <Col>
                             <Card.Text> Number of questions : { exam.numberofquestions}</Card.Text>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Fragment>
    )
}

export default FormDetails

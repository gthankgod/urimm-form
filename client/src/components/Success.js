import React, { useContext, Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { Jumbotron, Button, ListGroup } from 'react-bootstrap'
import { ExamContext } from '../context/ExamContextProvider'
import FormDetails from './Form/FormDetails'

const SuccessPage = () => {
    let { exam } = useContext(ExamContext);
    let [ show, setShow ] = useState("");
    let displayexam = (
        exam.questions.map((question, i) => {
           return (<ListGroup.Item key={i}>{question.question}<br /><br />
                <ListGroup>
                    {question.options.map((option, index )=> <ListGroup.Item key={index}>{option.value} </ListGroup.Item>)}
                </ListGroup>
            </ListGroup.Item>)
        })
    );
    return (
        <Fragment>
             <Jumbotron className="mt-4">
                <h1>Exam Succesfully Uploaded</h1>
                <p>
                    For more info on how to add more features to this question bank, react out to admin@urimmng.com
                </p>
                <p>
                    <Link variant="primary" to="/">Add New Exam</Link>
                </p>
            </Jumbotron>
            <Button className="mt-4" onClick={() => setShow(!show)}>View Submitted Questions</Button>
            {show ? (
                    <div className="mt-4">
                        <FormDetails/>
                        <ListGroup className="mt-4">
                            {displayexam}
                        </ListGroup>
                    </div>
                ) : null}
                
           
            
        </Fragment>
       

    )
}

export default SuccessPage

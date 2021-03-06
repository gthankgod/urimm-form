import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import {  Button, ListGroup,Row,Col } from 'react-bootstrap'
import { ExamContext } from '../context/ExamContextProvider'
import FormDetails from './Form/FormDetails'

const SuccessPage = (props) => {
    let { exam, submitExam,setExam } = useContext(ExamContext);
    let displayexam = (
        exam.questions.map((question, i) => {
           return (<ListGroup.Item key={i} className="mb-3">
               <Row className="mb-3">
                   <Col xs={10}>{question.question}</Col>
                   <Col xs={2}><Link to={{ pathname: `/edit/${i}`, state: { id: i,question }}}><i className="fa fa-pencil-square-o"></i></Link></Col>
               </Row>
                <ListGroup>
                    {question.options.map((option, index )=> <ListGroup.Item key={index}>{option.value} </ListGroup.Item>)}
                </ListGroup>
            </ListGroup.Item>)
        })
    );

    const subExamQuestion = e => {
        e.preventDefault();
        submitExam().then(data => data.status ? props.history.push('/success') : props.history.push('/error')); 
        setExam({
            category: '',
            year: '',
            questions: [],
            meta: {},
            numberofquestions: '',
            currentquestion: '',
            current: '',
            respMessage: false
        })       
      }
    return (
            <div className="mt-4">
                <FormDetails/>
                <ListGroup className="mt-4">
                    {displayexam}
                </ListGroup>
                <Button variant="success btn-block" type="submit" className="mt-4" onClick={e => subExamQuestion(e)}>Submit Exam</Button>
            </div>     
    )
}

export default SuccessPage

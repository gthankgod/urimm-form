import React, { useContext, useState, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Col, Button, ProgressBar,Row } from 'react-bootstrap'
import { ExamContext } from '../../context/ExamContextProvider'
import ShowModal from '../../ShowModal';
import FormDetails from './FormDetails'

const FormField = () => {
    let { exam,setExam, submitExam } = useContext(ExamContext);
    let [optValue, setOptValue ] = useState({ value: '', explanation: '', status: '' });
    let [options, setOptions ] = useState([]);
    let [ Question, setQuestion ] = useState({
        question: '',
        image: '',
        options: []
    });

    const addQuestion = (e) => {
        if(e.target.name === 'question') { setQuestion({...Question, question: e.target.value })}
        if(e.target.name === 'image') { setQuestion({...Question, image: e.target.value })}
    }

    const onClickOpt = (e) => {
        if (e.target.name === 'optionText') { setOptValue({ ...optValue, value: e.target.value}) };
    }

    const onClickOptAdd = () => {
      setOptions([...options, {...optValue}]);
      setQuestion({...Question, options: [...options, optValue]})
    };

    const submitQuestion = e => {
        e.preventDefault();
        setExam({...exam, questions: [...exam.questions, Question ], currentquestion: exam.currentquestion + exam.current });
    }

    const subExamQuestion = e => {
      e.preventDefault();
      submitExam();
      // <Redirect to="/success" /> 
    }

    return (
        <Fragment>
          <ShowModal />
            <Form className="mt-4">
            <ProgressBar animated now={exam.currentquestion - exam.current} className="mt-4"/>
                <FormDetails className="mt-4"/>
                <Form.Row className="mt-4">
                  <Form.Group as={Col}>
                    <Form.Label>Question</Form.Label>
                    <Form.Control type="text" placeholder="Add question" name="question" onChange={e => addQuestion(e)} />
                  </Form.Group>
                </Form.Row>

                  <Form.Group>
                    <Form.Label>Add Option</Form.Label>
                    <Row>
                      <Col sm={9}>
                        <Form.Control type="text" placeholder="Add option" name="optionText" onChange={e => onClickOpt(e)}/>
                      </Col>
                      <Col sm={3}>
                        < Button variant="danger btn-block" type="button" onClick={onClickOptAdd}> Add </Button>
                      </Col>
                    </Row>
                  </Form.Group>
                
                

                <ol>
                { options.map((option, index) => {
                      return <li key={index} type="a">{option.value}</li>
                  })
                }</ol>
                <Form.File 
                  name="image"
                  label="Add an image"
                  custom
                  className="mt-4"
                />

                  {exam.questions.length !== 100 / exam.current ? (
                    <Col>
                      <Button variant="primary btn-block" type="submit" className="mt-4" onClick={e => submitQuestion(e)}>
                      Add Next Question
                      </Button>
                  </Col>
                  ) : (
                      <Button variant="success btn-block" type="submit" className="mt-4" onClick={e => subExamQuestion(e)}> Preview and Submit</Button>
                  ) 
                  }
                  
                
            </Form>
        </Fragment>
 
    )
}

export default FormField

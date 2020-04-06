import React, { useContext, useState, Fragment } from 'react'
import { Form, Col, Button, ProgressBar,Row } from 'react-bootstrap'
import { ExamContext } from '../../context/ExamContextProvider'
import ShowModal from '../../ShowModal';
import FormDetails from './FormDetails'

const FormField = (props) => {
    let { exam,setExam } = useContext(ExamContext);
    let [optValue, setOptValue ] = useState({ value: '', explanation: '', status: "" });
    let [options, setOptions ] = useState([]);
    let [ Question, setQuestion ] = useState({
        question: '',
        image: '',
        options: []
    });

    const addQuestion = (e) => {
        if(e.target.name === 'question') { setQuestion({...Question, question: e.target.value })}
        if(e.target.name === 'image') { console.log(e.target.value) }
    }

    const onClickOpt = (e) => {
        if (e.target.name === 'optionText') { setOptValue({ ...optValue, value: e.target.value}) };
        if (e.target.name === 'optStatus') { setOptValue({ ...optValue, status: e.target.value}) };
        if (e.target.name === 'optionExp') { setOptValue({ ...optValue, explanation: e.target.value}) };
    }

    const onClickOptAdd = () => {
      setOptions([...options, {...optValue}]);
      setQuestion({...Question, options: [...options, optValue]});
      setOptValue({ value: '', explanation: '', status: "" });
    };

    const submitQuestion = e => {
        e.preventDefault();
        setExam({...exam, questions: [...exam.questions, Question ], currentquestion: exam.currentquestion + exam.current });
        setQuestion({
          question: '',
          image: '',
          options: []
      });
        setOptions([]);
    }

    const subExamQuestion = e => {
      e.preventDefault();
      props.history.push('/preview');
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
                    <Form.Control as="textarea" rows="3" placeholder="Add question" name="question" value={Question.question} onChange={e => addQuestion(e)} />
                  </Form.Group>
                </Form.Row>

                  <Form.Group>
                    <Form.Label>Add Option</Form.Label>
                    <Row>
                      <Col sm={12} className="mb-3">
                        <Form.Control type="text" placeholder="Add option" name="optionText" value={optValue.value} onChange={e => onClickOpt(e)}/>
                      </Col>
                      <Col sm={9} className="mb-3">
                        <Form.Control type="text" placeholder="Explanation" name="optionExp" value={optValue.explanation} onChange={e => onClickOpt(e)}/>
                      </Col>
                      <Col sm={3}>
                      <Form.Control as="select" name="optStatus" onChange={(e) => onClickOpt(e)} >
                      <option value="Select Option Status">Select status</option>
                      <option value="Correct">Correct</option>
                      <option value="Incorrect">Incorrect</option>
                      
                    </Form.Control>
                      </Col>
                      <Col sm={3}>
                        < Button variant="danger btn-block" type="button" onClick={onClickOptAdd}> Add </Button>
                      </Col>
                    </Row>
                  </Form.Group>
                
                

                <ol>
                { options.map((option, index) => {
                      return <li key={index} type="a">
                                <Row>
                                  <Col>{option.value}</Col>
                                  <Col>{option.explanation}</Col>
                                  <Col>{option.status}</Col>
                                </Row>
                            </li>
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

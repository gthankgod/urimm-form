import React, { useContext, useState, Fragment } from 'react'
import { Form, Col, Button, ProgressBar,Row } from 'react-bootstrap'
import { ExamContext } from '../../context/ExamContextProvider'
import ShowModal from '../../ShowModal';
import FormDetails from './FormDetails'
import ToastMsg from './ToastMsg'

const FormField = (props) => {
    let { exam,setExam } = useContext(ExamContext);
    let [optValue, setOptValue ] = useState({ value: '', explanation: '', status: "" });
    let [options, setOptions ] = useState([]);
    let [ Question, setQuestion ] = useState({
        question: '',
        image: '',
        instruction: '',
        options: []
    });


    let [ error, setError ] = useState({ status : false, msg: "" });
    const addQuestion = (e) => {
        if(e.target.name === 'instruction') { setQuestion({...Question, instruction: e.target.value })}
        if(e.target.name === 'question') { setQuestion({...Question, question: e.target.value })}
        if(e.target.name === 'image') { console.log(e.target.value) }
    }

    const onClickOpt = (e) => {
        if (e.target.name === 'optionText' ) { setOptValue({ ...optValue, value: e.target.value}) };
        if (e.target.name === 'optStatus') { setOptValue({ ...optValue, status: e.target.value}) };
        if (e.target.name === 'optionExp') { setOptValue({ ...optValue, explanation: e.target.value}) };
    }

    const onClickOptAdd = () => {
      if(!optValue.value || !optValue.status) {
        setError({ status: true, msg: 'Option is not properly formatted' });
        setTimeout(() => setError({ status: false, msg: "" }), 5000);
        return
      }


      setOptions([...options, {...optValue}]);
      setQuestion({...Question, options: [...options, optValue]});
      setOptValue({ value: '', explanation: '', status: "" });
    };

    const submitQuestion = e => {
        e.preventDefault();
        if(!Question.question) {
          setError({ status: true, msg: 'Option status cannot be empty' });
          setTimeout(() => setError({ status: false, msg: "" }), 5000);
          return
        } 
        
        if(Question.options.length < 2) {
          setError({ status: true, msg: 'There must be at least two options' });
          setTimeout(() => setError({ status: false, msg: "" }), 5000);
          return
        }
         
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
            {error.status ? <ToastMsg msg={error.msg}/> : null}
                <FormDetails className="mt-4"/>
                
                <Form className="mt-4">
                  <Row>
                    <Col sm={12} className="mb-3">
                      <Form.Group>
                        <Form.Label>Instruction</Form.Label>
                        <Form.Control type="text" placeholder="Add Instruction" name="instruction" value={Question.instruction} onChange={e => addQuestion(e)}/>
                      </Form.Group>
                    </Col>
                    <Col sm={12} className="mb-3">
                    <Form.Group>
                      <Form.Label>Question</Form.Label>
                      <Form.Control as="textarea" rows="3" placeholder="Add question" name="question" value={Question.question} onChange={e => addQuestion(e)} />
                    </Form.Group>
                    </Col>
                  </Row>
                 
                 
                </Form>

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
                      <Form.Control as="select" value={optValue.status} name="optStatus" onChange={(e) => onClickOpt(e)} className="mb-3">
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

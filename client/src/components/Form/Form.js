import React, { useContext, useState, Fragment } from 'react'
import { Form, Col, Button, ProgressBar,Row } from 'react-bootstrap'
import { ExamContext } from '../../context/ExamContextProvider'
import ShowModal from '../../ShowModal';
import FormDetails from './FormDetails'
import ToastMsg from './ToastMsg'
import { Editor } from "@tinymce/tinymce-react";

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
    let [edit, setEdit ] = useState({
      status: false,
      optIndex: ''
    });

    let [ error, setError ] = useState({ status : false, msg: "" });
    const addQuestion = async e => {
        if(e.target.name === 'instruction') { setQuestion({...Question, instruction: e.target.value })}
        if(e.target.name === 'question') { setQuestion({...Question, question: e.target.value })}
        if(e.target.name === 'image') { 
            const formData = new FormData();
            formData.append('image', e.target.files[0]);
            try {
              const imgRes =  await fetch('https://urimmapp.herokuapp.com/questions/image',{
                method: 'POST',
                body: JSON.stringify(formData)
            });
              
            const imgData = await imgRes.json();
            console.log(imgData);
            } catch (error) {
              
            }
         }
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

    const editOptionClick = (option, index) => {
        setOptValue({ value: option.value, explanation: option.explanation, status: option.status});
        setEdit({ status: true, optIndex: index});
    }

    const editOption = () => {
      if(!optValue.value || !optValue.status) {
        setError({ status: true, msg: 'Option is not properly formatted' });
        setTimeout(() => setError({ status: false, msg: "" }), 5000);
        return
      }
      
      setOptions(options.map((opt, i) => i === edit.optIndex ? {...optValue} : {...opt}))
      setOptValue({ value: '', explanation: '', status: "" });
      setEdit({ status: false, optIndex: ''});
    }

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
          instruction: '',
          image: '',
          options: []
      });
        setOptions([]);
    }

    const subExamQuestion = e => {
      e.preventDefault();
      props.history.push('/preview');
    }

    const resetExam = () => {
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
        <Fragment>
          <ShowModal />
            <Form className="mt-4">


                  {exam.questions.length !== 100 / exam.current ? (
                    <Fragment>
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
                              <Col sm={12} className="mb-3">
                                <Editor
                                  value={Question.question}
                                  init={{
                                    height: 500,
                                    menubar: false
                                  }}
                                  onEditorChange={e => console.log(e)}
                                />
                              </Col>                         
                            </Row>
                            
                            
                          </Form>
          
                            <Form.Group>
                                {edit.status ? (
                                  <Form.Group>
                                    <Form.Label>Edit Option</Form.Label>
                                      <Row>
                                        <Col xs={12} className="mb-3">
                                          <Form.Control type="text" placeholder="Add option" name="optionText" value={optValue.value} onChange={e => onClickOpt(e)}/>
                                        </Col>
                                        <Col xs={8} className="mb-3">
                                          <Form.Control type="text" placeholder="Explanation" name="optionExp" value={optValue.explanation} onChange={e => onClickOpt(e)}/>
                                        </Col>
                                        <Col xs={4}>
                                        <Form.Control as="select" value={optValue.status} name="optStatus" onChange={(e) => onClickOpt(e)} className="mb-3">
                                        <option value="Select Option Status">Select status</option>
                                        <option value="Correct">Correct</option>
                                        <option value="Incorrect">Incorrect</option>
                                        
                                      </Form.Control>
                                        </Col>
                                      <Col xs={6}>
                                        < Button variant="info btn-block" type="button" onClick={editOption}> Edit </Button>
                                      </Col>
                                      </Row>
                                  </Form.Group>
                                ) : (
                                  <Form.Group>
                                    <Form.Label>Add Option</Form.Label>
                                      <Row>
                                        <Col xs={12} className="mb-3">
                                          <Form.Control type="text" placeholder="Add option" name="optionText" value={optValue.value} onChange={e => onClickOpt(e)}/>
                                        </Col>
                                        <Col xs={9} className="mb-3">
                                          <Form.Control type="text" placeholder="Explanation" name="optionExp" value={optValue.explanation} onChange={e => onClickOpt(e)}/>
                                        </Col>
                                        <Col xs={3}>
                                        <Form.Control as="select" value={optValue.status} name="optStatus" onChange={(e) => onClickOpt(e)} className="mb-3">
                                        <option value="Select Option Status">Select status</option>
                                        <option value="Correct">Correct</option>
                                        <option value="Incorrect">Incorrect</option>
                                        
                                      </Form.Control>
                                        </Col>
                                      <Col xs={6}>
                                        < Button variant="secondary btn-block" type="button" onClick={onClickOptAdd}> Add </Button>
                                      </Col>
                                      </Row>
                                  </Form.Group>
                                  ) } 
                            </Form.Group>
                          
                          
          
                          <ol>
                          { options.map((option, index) => {
                                return <li key={index} type="a">
                                          <Row>
                                            <Col xs={4}>{option.value}</Col>
                                            <Col xs={4}>{option.explanation}</Col>
                                            <Col xs={2}>{option.status}</Col>
                                            <Col xs={2}><i className="fa fa-pencil-square-o blue" onClick={e => editOptionClick(option,index)}></i></Col>
                                          </Row>
                                      </li>
                            })
                          }</ol>
                          <Form.File 
                            type="file"
                            name="image"
                            label="Add an image"
                            className="mt-4"
                            onChange={e => addQuestion(e)}
                            />
                        <Button variant="primary btn-block" type="submit" className="mt-4" onClick={e => submitQuestion(e)}>
                        Add Next Question
                        </Button>
                      </Fragment>
                  ) : (
                      <div className="container my-auto">
                      <h2 className="lead">Thanks for uploading questions on the URIMM platform</h2>
                      <Button variant="success btn-block" type="submit" className="mt-4" onClick={e => subExamQuestion(e)}> Preview and Submit</Button>
                      </div>
                    ) 
                  }
                  
                
            </Form>
            <Button variant="danger" type="submit" className="mt-4" onClick={() => resetExam()}> Reset All Questions</Button>
        </Fragment>
 
    )
}

export default FormField

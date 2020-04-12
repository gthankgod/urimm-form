import React, { useState, Fragment, useContext } from 'react'
import { Row, Form, Col, Button } from 'react-bootstrap'
import { ExamContext } from "../../context/ExamContextProvider";

const EditExam = (props) => {
    const { updateQuestion } = useContext(ExamContext);
    let { question, image, options } = props.location.state.question
    console.log(props.location.state)
    let { id } = props.location.state;

    let [ Question, setQuestion ] = useState({
        id,
        question,
        image,
        options
    });

    const submitUpdate = () => {
        if(!Question.question) return;
        updateQuestion(Question);
        props.history.push("/preview");
    }

    return (
        <Fragment>
            <h2 className="mt-3">Preview Questions</h2>
            <Form.Row className="mt-4">
                  <Form.Group as={Col}>
                    <Form.Label>Question {id + 1}</Form.Label>
                    <Form.Control type="text" placeholder="Add question" value={Question.question} onChange={e => setQuestion({...Question, question: e.target.value})} />
                  </Form.Group>
                </Form.Row>

                  <ol type="a">
                    { options.map((option, index)=> {
                        return (
                            <li className="mb-3" key={index}>
                            <Row>
                                <Col sm={12} className="mb-2">
                                     <Form.Control type="text" value={(Question.options.find((o,i) => i === index )).value} onChange={e => setQuestion({...Question, options: options.map((o , i) => i === index ? {...o, value : e.target.value} : {...o} )})} />
                                </Col>
                                <Col sm={8} className="mb-2">
                                     <Form.Control type="text" value={(Question.options.find((o,i) => i === index )).explanation} onChange={e => setQuestion({...Question, options: options.map((o , i) => i === index ? {...o, explanation : e.target.value} : {...o} )})} />
                                </Col>
                                <Col sm={4} className="mb-2">
                                     <Form.Control as="select" value={(Question.options.find((o,i) => i === index )).status} onChange={e => setQuestion({...Question, options: options.map((o , i) => i === index ? {...o, status : e.target.value} : {...o} )})} >
                                        <option value="Select Option Status">Select status</option>
                                        <option value="Correct">Correct</option>
                                        <option value="Incorrect">Incorrect</option>
                                    </Form.Control>
                                </Col>
                            </Row>
                            </li>
                        )
                    })}
                  </ol>
                  < Button variant="success btn-block" type="button" onClick={submitUpdate}> Update Question</Button>
        </Fragment>
    )
}

export default EditExam

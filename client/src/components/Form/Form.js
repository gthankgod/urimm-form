import React, { useContext, useState } from 'react'
import { Form, Col, Button, ProgressBar } from 'react-bootstrap'
import { ExamContext } from '../../context/ExamContextProvider'

const FormField = () => {
    let { exam } = useContext(ExamContext);
    let [optValue, setOptValue ] = useState('');
    let [options, setOptions ] = useState([]);


    const onClickOpt = (e) => {
      setOptValue(e.target.value)
    };

    const onClickOptAdd = () => {
      setOptions([...options,optValue ])
    }
    return (
        <Form className="mt-4">
       <ProgressBar animated now={exam.numberofquestions} />

          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Question</Form.Label>
              <Form.Control type="text" placeholder="Add Question" />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Add Options</Form.Label>
              <Form.Control type="text" placeholder="Add option" onClick={e => onClickOpt(e)}/>
            </Form.Group>
            < Button variant="primary" type="button" as={Col} onClick={onClickOptAdd}> Add </Button>
          </Form.Row>
          <ul>
          { options.map(option => {
                return <li>{option}</li>
             })
          }</ul>
          <Form.File 
            id="custom-file"
            label="Add an image"
            custom
          />


          <Button variant="primary btn-block" type="submit">
            Submit
          </Button>
      </Form>
    )
}

export default FormField

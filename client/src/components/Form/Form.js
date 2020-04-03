import React, { useContext, useState } from 'react'
import { Form, Col, Button, ProgressBar } from 'react-bootstrap'
import { ExamContext } from '../../context/ExamContextProvider'

const FormField = () => {
    let { exam } = useContext(ExamContext);
    let [option, setOption ] = useState([]);
    return (
        <Form className="mt-4">
       <ProgressBar animated now={exam.numberofquestions} />

          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Question</Form.Label>
              <Form.Control type="text" placeholder="Enter email" />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Add Options</Form.Label>
              <Form.Control type="text" placeholder="Enter email" />
            </Form.Group>
            < Button variant="primary" type="button"> Add Options </Button>
          </Form.Row>

          <Form.File 
            id="custom-file"
            label="Add an image"
            custom
          />

          <Form.Group id="formGridCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>

          <Button variant="primary btn-block" type="submit">
            Submit
          </Button>
      </Form>
    )
}

export default FormField

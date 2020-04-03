import React, { useContext } from 'react'
import { Form, Col, Button, ProgressBar } from 'react-bootstrap'
import { ExamContext } from '../../context/ExamContextProvider'

const FormField = () => {
    let { exam } = useContext(ExamContext);
    return (
        <Form className="mt-4">
       <ProgressBar animated now={exam.numberofquestions} />

          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Question</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="formGridAddress1">
            <Form.Label>Options</Form.Label>
            <Form.Control placeholder="1234 Main St" />
          </Form.Group>

          <Form.Group controlId="formGridAddress2">
            <Form.Label>Address 2</Form.Label>
            <Form.Control placeholder="Apartment, studio, or floor" />
          </Form.Group>

          

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

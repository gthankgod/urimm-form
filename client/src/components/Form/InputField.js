import React from 'react'
import { Form,Col } from 'react-bootstrap'

const InputField = () => {
    return (
       <div>
           <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
       </div>
    )
}

export default InputField

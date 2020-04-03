import React, { useContext, useState } from 'react'
import { Form, Col, Button, ProgressBar } from 'react-bootstrap'
import { ExamContext } from '../../context/ExamContextProvider'
import FormDetails from './FormDetails'

const FormField = () => {
    let { exam } = useContext(ExamContext);
    let [optValue, setOptValue ] = useState({ value: '', type: 'a'});
    let [options, setOptions ] = useState([]);


    const onClickOpt = (e) => {
        if (e.target.name === 'optionText') { setOptValue({ ...optValue, value: e.target.value}) };
        if (e.target.name === 'optionVal') { setOptValue({ ...optValue, type: e.target.value}) }
    }

    const onClickOptAdd = () => {
      setOptions([...options,optValue ]);
    }
    return (
        <Form className="mt-4">
       <ProgressBar animated now={exam.currentquestion} className="mt-4"/>
          <FormDetails className="mt-4"/>
          <Form.Row className="mt-4">
            <Form.Group as={Col}>
              <Form.Label>Question</Form.Label>
              <Form.Control type="text" placeholder="Add Question" />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Add Option</Form.Label>
              <Form.Control type="text" placeholder="Add option" name="optionText" onChange={e => onClickOpt(e)}/>
            </Form.Group>
            <Form.Group as={Col} >
              <Form.Label>Value</Form.Label>
              <Form.Control type="text" placeholder="Add option" name="optionVal" onChange={e => onClickOpt(e)}/>
            </Form.Group>
          < Button variant="primary btn" type="button" as={Col} onClick={onClickOptAdd} className="mt-4"> Add </Button>
          </Form.Row>

          <ol>
          { options.map((option, index) => {
                return <li key={index}>{option.value}</li>
             })
          }</ol>
          <Form.File 
            id="custom-file"
            label="Add an image"
            custom
            className="mt-4"
          />


          <Button variant="primary btn-block" type="submit" className="mt-4">
            Submit
          </Button>
      </Form>
    )
}

export default FormField

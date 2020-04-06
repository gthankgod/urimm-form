import React, { useState } from 'react'

const EditExam = (props) => {
    let [ Question, setQuestion ] = useState({
        question: '',
        image: '',
        options: []
    });

    console.log(props.location.state);
    return (
        <div>
            {/* <Form.Row className="mt-4">
                  <Form.Group as={Col}>
                    <Form.Label>Question</Form.Label>
                    <Form.Control type="text" placeholder="Add question" name="question" value={Question.question} onChange={e => addQuestion(e)} />
                  </Form.Group>
                </Form.Row>

                  <Form.Group>
                    <Form.Label>Add Option</Form.Label>
                    <Row>
                      <Col sm={6} className="mb-3">
                        <Form.Control type="text" placeholder="Add option" name="optionText" value={optValue.value} onChange={e => onClickOpt(e)}/>
                      </Col>
                      <Col sm={6} className="mb-3">
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
                /> */}
        </div>
    )
}

export default EditExam

import React, { Fragment,useState, useContext } from 'react'
import { Modal, Button, Form, Col, Row } from 'react-bootstrap'
import { ExamContext } from './context/ExamContextProvider'

const ShowModal = () => {
  const [show, setShow] = useState(true);
  let [ formState, setFormState ] = useState({
        category: '',
        subject: '',
        year: '',
        numberofquestions: ''
  });

  let { setExam } = useContext(ExamContext);

  const handleClose = () => {setShow(false)};
  const onChangeClick = ({ target }) => {
    let { name, value } = target;
      if(name === 'category') {
        setFormState({...formState, category: value })
        }

        if(name === 'year') {
            setFormState({...formState, year: value })
         }

        if(name === 'subject') {
            setFormState({...formState, subject: value })
         }

         if(name === 'numberofquestions') {
            setFormState({...formState, numberofquestions: value })
         }
  }

  const onSubmit = () => {
      setExam(formState);
  }
    return (
    <Fragment>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Set Exam Format</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Category</Form.Label>
              <Form.Control as="select" value="Choose a category" name="category" onChange={(e) => onChangeClick(e)}>
                <option value="PROFESSIONALS">PROFESSIONALS</option>
                <option value="STUDENTS">STUDENTS</option>
                <option value="TUTORS">TUTORS</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Subject</Form.Label>
              <Form.Control as="select" value="Choose subject" name="subject" onChange={(e) => onChangeClick(e)} >
                <option value="Mathematics">Mathematics</option>
                <option value="English">English</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Year</Form.Label>
              <Form.Control as="select" value="Choose Year" name="year" onChange={(e) => onChangeClick(e)}>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Number of Questions</Form.Label>
                <Form.Control type="text" name="numberofquestions" onChange={(e) => onChangeClick(e)} />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Row>
            <Button variant="primary" onClick={() => { handleClose(); onSubmit() }} type="button">
              Save Changes
            </Button>
            <Button variant="primary" onClick={() => { handleClose(); onSubmit() }} type="button">
              Submit Questions
            </Button>
          </Row>
          
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}


export default ShowModal

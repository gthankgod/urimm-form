import React, { Fragment,useState, useContext, useEffect } from 'react'
import { Modal, Button, Form, Col } from 'react-bootstrap'
import { ExamContext } from './context/ExamContextProvider'

const ShowModal = () => {
  const [show, setShow] = useState(true);
  let [year, setYear ] =  useState([]);
  let [subject, setSubject ] =  useState([]);
  let [category, setCategory ] =  useState([]);
  let [ formState, setFormState ] = useState({
        category: '',
        subject: '',
        year: '',
        numberofquestions: '',
        currentquestion : ''
  });

  useEffect(async () => { 
    let res = await fetch('https://urimmapp.herokuapp.com/questions/type');
    let type = await res.json();
    let { data } = type;
    console.log(data);
    setCategory(data)
  }, []);

  useEffect(async () => { 
    let res = await fetch('https://urimmapp.herokuapp.com/questions/year');
    let year = await res.json();
    let { data } = year;
    console.log(data);
    setYear(data)
  }, []);

  useEffect(async () => { 
    let res = await fetch('https://urimmapp.herokuapp.com/questions/subject');
    let category = await res.json();
    let { data } = category;
    console.log(data);
    setSubject(data)
  }, []);

  
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
            setFormState({...formState, numberofquestions: value, currentquestion: 100 / value })
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
        <Form.Group as={Col}>
              <Form.Label>Category</Form.Label>
              <Form.Control as="select" name="category" onChange={(e) => onChangeClick(e)}>
                <option value="Choose a category">Choose a category</option>
                { category.map(a => {
                       return <option value={a.questionType} key={a._id}>{a.questionType}</option> 
                  })
                }
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Subject</Form.Label>
              <Form.Control as="select" name="subject" onChange={(e) => onChangeClick(e)} >
                <option value="Choose a subject">Choose a subject</option>
                { subject.map(a => {
                       return <option value={a.subject} key={a._id}>{a.subject}</option> 
                  })
                }
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Year</Form.Label>
              <Form.Control as="select" name="year" onChange={(e) => onChangeClick(e)}>
                <option value="Choose a year">Choose a year</option>
                { year.map(a => {
                       return <option value={a.year} key={a._id}>{a.year}</option> 
                  })
                }
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col}>
            <Form.Label>Number of Questions</Form.Label>
                <Form.Control type="text" name="numberofquestions" onChange={(e) => onChangeClick(e)} />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => { handleClose(); onSubmit() }} type="button">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}


export default ShowModal

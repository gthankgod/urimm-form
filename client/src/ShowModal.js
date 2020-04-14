import React, { Fragment,useState, useContext, useEffect } from 'react'
import { Modal, Button, Form, Col } from 'react-bootstrap'
import { ExamContext } from './context/ExamContextProvider'
import ToastMsg from './components/Form/ToastMsg';

const ShowModal = () => {
  const [show, setShow] = useState(true);
  let [category, setCategory ] =  useState([]);
  let [year, setYear ] =  useState([]);
  let [subject, setSubject ] =  useState([]);
  let [type, setType ] =  useState([]);
  let [ error, setError ] = useState({ status : false, msg: "" });
  let [ formState, setFormState ] = useState({
        category: '',
        year: '',
        meta: {
          type: '',
          subject: '',
          firstCategory: '',
          school: '',
          faculty: '',
          department: '',
          totalScore: '',
          expectedScore: '',
          courseName: '',
          lecturer: ''
        },
        numberofquestions: '',
        currentquestion : ''
  });


  useEffect(() => { 
    (async function() {
      let res = await fetch('https://urimmapp.herokuapp.com/questions/category');
      let category = await res.json();
      let { data } = category;
      setCategory(data)
    })() 
  }, []);

  useEffect(() => { 
    (async function () {
      let res = await fetch('https://urimmapp.herokuapp.com/questions/type');
      let type = await res.json();
      let { data } = type;
      setType(data)
    })()  
  }, []);

  useEffect(() => { 
    (async function () {
      let res = await fetch('https://urimmapp.herokuapp.com/questions/year');
      let year = await res.json();
      let { data } = year;
      setYear(data)
    })() 
  }, []);

  useEffect(() => { 
    (async function () {
      let res = await fetch('https://urimmapp.herokuapp.com/questions/subject');
      let category = await res.json();
      let { data } = category;
      setSubject(data)
    })()
    
  }, []);


  let { exam, setExam } = useContext(ExamContext);

  const handleClose = () => {
    if(!formState.category) {
      setError({ status: true, msg: 'Category is not properly formatted' });
      setTimeout(() => setError({ status: false, msg: "" }), 5000);
      return
    }
    
    if(!formState.year) {
      setError({ status: true, msg: 'Year is not properly formatted' });
      setTimeout(() => setError({ status: false, msg: "" }), 5000);
      return
    }
    if(!formState.numberofquestions || formState.numberofquestions < 1 ) {
      setError({ status: true, msg: 'Number of Questions is not properly formatted' });
      setTimeout(() => setError({ status: false, msg: "" }), 5000);
      return
    }
    setShow(false)
  };

  const onChangeClick = ({ target }) => {
    let { name, value } = target;
        if(name === 'category') {
          setFormState({...formState, category: value })
          }

        if(name === 'type') {
          setFormState({...formState,meta: {...formState.meta, type: value } })
          }

        if(name === 'year') {
            setFormState({...formState, year: value })
         }

        if(name === 'subject') {
            setFormState({...formState, meta: {...formState.meta, subject: value } })
         }

         if(name === 'numberofquestions') {
            setFormState({...formState, numberofquestions: value, currentquestion: 100 / value, current: 100 / value })
         }

         if(name === 'firstCategory') {
            setFormState({...formState, meta: {...formState.meta, firstCategory: value } })
         }

       if(name === 'school') {
           setFormState({...formState, meta: {...formState.meta, school: value } })
         }

      if(name === 'faculty') {
          setFormState({...formState, meta: {...formState.meta, faculty: value } })
        }

        if(name === 'department') {
          setFormState({...formState, meta: {...formState.meta, department: value } })
        }

        if(name === 'totalScore') {
          setFormState({...formState, meta: {...formState.meta, totalScore: value } })
        }

        if(name === 'expectedScore') {
          setFormState({...formState, meta: {...formState.meta, expectedScore: value } })
        }

        if(name === 'courseName') {
          setFormState({...formState, meta: {...formState.meta, courseName: value } })
        }

        if(name === 'lecturer') {
          setFormState({...formState, meta: {...formState.meta, lecturer: value } })
        }
  }

  const onSubmit = () => {
      setExam({...exam,...formState});
  }
    return (
    <Fragment>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Set Exam Format</Modal.Title>
        </Modal.Header>
        {error.status ? <ToastMsg msg={error.msg}/> : null}
        <Modal.Body>
            <Form.Group as={Col}>
              <Form.Label>Category</Form.Label>
              <Form.Control as="select" name="category" onChange={(e) => onChangeClick(e)}>
                <option value="Choose a category">Choose a category</option>
                { category.map(a => {
                       return <option value={a.category} key={a._id}>{a.category}</option> 
                  })
                }
              </Form.Control>
            </Form.Group>
            { formState.category === 'STUDENT' ? (
              <Form.Group as={Col}>
              <Form.Label>Choose a subcategory</Form.Label>
              <Form.Control as="select" name="firstCategory" onChange={(e) => onChangeClick(e)}>
                <option value="Choose a firstcategory">Choose a sub Category</option>
                <option value="UNIVERSITY">UNIVERSITY</option>
                <option value="SECONDARY SCHOOL">SECONDARY SCHOOL</option>
              </Form.Control>
            </Form.Group>
            ) : null }
            { formState.meta.firstCategory === 'SECONDARY SCHOOL' ? (
              <Fragment>
                <Form.Group as={Col}>
                <Form.Label>Exam Type</Form.Label>
                <Form.Control as="select" name="type" onChange={(e) => onChangeClick(e)}>
                  <option value="Choose the Exam type">Choose exam type</option>
                  { type.map(a => {
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
             </Fragment>
            ) :null }
            

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
            { formState.meta.firstCategory === 'UNIVERSITY' ? 
              ( 
                <Fragment>
                  <Form.Group as={Col}>
                  <Form.Label>Course Name</Form.Label>
                      <Form.Control type="text" name="courseName" onChange={(e) => onChangeClick(e)} />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>School</Form.Label>
                      <Form.Control as="select" name="school" onChange={(e) => onChangeClick(e)} >
                      <option value="Choose a school">Choose your school</option>
                      <option value="UNIVERSITY OF IBADAN">UNIVERSITY OF IBADAN</option>
                      <option value="UNIVERSITY OF NIGERIA, NSUKKA">UNIVERSITY OF NIGERIA,NSUKKA</option>
                      <option value="UNIVERSITY OF ABUJA">UNIVERSITY OF ABUJA</option>
                    </Form.Control>
                  </Form.Group>
                  
                  <Form.Group as={Col}>
                  <Form.Label>Faculty</Form.Label>
                      <Form.Control type="text" name="faculty" onChange={(e) => onChangeClick(e)} />
                  </Form.Group>
                  <Form.Group as={Col}>
                  <Form.Label>Department</Form.Label>
                      <Form.Control type="text" name="department" onChange={(e) => onChangeClick(e)} />
                  </Form.Group>
                  <Form.Group as={Col}>
                  <Form.Label>Total Score</Form.Label>
                      <Form.Control type="text" name="totalScore" onChange={(e) => onChangeClick(e)} />
                  </Form.Group>
                  <Form.Group as={Col}>
                  <Form.Label>Expected Pass Mark</Form.Label>
                      <Form.Control type="text" name="expectedScore" onChange={(e) => onChangeClick(e)} />
                  </Form.Group>
                  <Form.Group as={Col}>
                  <Form.Label>Name of Lecturer</Form.Label>
                      <Form.Control type="text" name="lecturer" onChange={(e) => onChangeClick(e)} />
                  </Form.Group>
                </Fragment>
              )
            : null }
            
            <Form.Group as={Col}>
            <Form.Label>Number of Questions</Form.Label>
                <Form.Control type="text" name="numberofquestions" onChange={(e) => onChangeClick(e)} />
            </Form.Group>

            
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => { handleClose(); onSubmit() }} type="button">
            Add Exam Details
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}


export default ShowModal

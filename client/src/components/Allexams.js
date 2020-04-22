import React, { useState, useEffect } from 'react'
import { Card, Button, ListGroup, Row } from 'react-bootstrap'

const Allexams = () => {
    let [ exams, setExam ] = useState([]);
    let [ show, setshow ] = useState(false);

    useEffect(() => { 
        (async function() {
          let res = await fetch('https://urimmapp.herokuapp.com/questions');
          let { data } = await res.json();
          
          setExam(data);
        })() 
      }, []);

      console.log(exam);
    return (
        <div className="mt-4">
            { exams.map(exam => {
                <Card>
                    <Card.Header as="h5">{exam.meta.subject || exam.meta.courseName}</Card.Header>
                    <Card.Body>
                        <Card.Title>{exam.year}</Card.Title>
                        <Card.Text>{exam.meta.type || exam.meta.school}</Card.Text>
                        <Card.Text>{exam.meta.department || exam.meta.secondCategory}</Card.Text>
                        <Button variant="primary" onClick={() => setshow(!show)}>View Questions</Button>
                    </Card.Body>
                </Card> 
                    { show ? (
                        exam.questions.map((question, ind) => {
                            return (
                                    <ListGroup.Item key={ind} className="mb-3">
                                    <Row className="mb-3">
                                        <Col xs={12}>{question}</Col>
                                    </Row>
                                        <ListGroup>
                                            {question.options.map((option, index )=> <ListGroup.Item key={index}>{option.value} </ListGroup.Item>)}
                                        </ListGroup>
                                    </ListGroup.Item>
                            )
                        })
                        
                    ) : null }
                })
            }
           
        </div>
    )
}

export default Allexams

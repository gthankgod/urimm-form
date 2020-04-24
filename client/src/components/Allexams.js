import React, { useState, useEffect } from 'react'
import { Card, Button, ListGroup, Row ,Col} from 'react-bootstrap'

const Allexams = () => {
    let [ exams, setExam ] = useState([]);
    let [ show, setshow ] = useState(false);

    useEffect(() => { 
        (async function() {
          let res = await fetch('https://urimmapp.herokuapp.com/questions');
          let { data } = await res.json();
          console.log(data.reverse());
          setExam(data);
        })() 
      }, []);

    return (
        <div className="mt-4">
            { exams.map((exam, i) => {
                return( <Card key={i} className="mb-3">
                    <Card.Header as="h5">{exam.meta.subject || exam.meta.courseName || exam.meta.firstCategory}</Card.Header>
                    <Card.Body>
                        <Card.Title>Year: {exam.year}</Card.Title>
                        <Card.Text>Category: {exam.category}</Card.Text>
                        <Card.Text>{exam.meta.department || exam.meta.secondCategory}</Card.Text>
                        <Card.Text>{exam.meta.firstCategory}</Card.Text>
                        <Button variant="primary" onClick={() => setshow(!show)}>View Questions</Button>
                    </Card.Body>
                    { show ? (
                        exam.questions.map((question, ind) => {
                            return (
                                    <ListGroup.Item key={ind} className="mb-3">
                                    <Row className="mb-3">
                                        <Col xs={12}>{question.question}</Col>
                                    </Row>
                                        <ListGroup>
                                            {question.options.map((option, index )=> <ListGroup.Item key={index}>{option.value} </ListGroup.Item>)}
                                        </ListGroup>
                                    </ListGroup.Item>
                            )
                        })
                        
                    ) : null }
                 </Card> )  
                })
            }
           
        </div>
    )
}

export default Allexams

import React, { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'

const Allexams = () => {
    let [ exam, setExam ] = useState([]);

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
           <Card>
            <Card.Header as="h5">Featured</Card.Header>
            <Card.Body>
                <Card.Title>Special title treatment</Card.Title>
                <Card.Text>
                With supporting text below as a natural lead-in to additional content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
            </Card> 
        </div>
    )
}

export default Allexams

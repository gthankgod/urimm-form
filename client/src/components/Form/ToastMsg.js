import React, { useState } from 'react'
import { Row, Col, Toast ,Container } from 'react-bootstrap'

const ToastMsg = (props) => {
    const [show, setShow] = useState(true);
  return (
      <Container>
          <Row>
              <Col>
                <Toast onClose={() => setShow(false)} show={show} delay={4000} autohide>
                    <Toast.Header>
                        <img
                        src="holder.js/20x20?text=%20"
                        className="rounded"
                        alt=""
                        />
                        <strong className="mr-auto">Error Message</strong>
                        <small>Powered by URIMM</small>
                    </Toast.Header>
                        <Toast.Body>{props.msg}</Toast.Body>
                    </Toast>
              </Col>
          </Row>
        
      </Container>
  );
}

export default ToastMsg

import React, { useState } from 'react'
import { Spinner } from 'react-bootstrap'

const Spin = () => {
    let [show1, setShow] = useState(true);
    let [show2, setShow2] = useState(false);
    let [show3, setShow3] = useState(false);

    // setInterval(() => {
    //     setTimeout(() => setShow(!show1), 1000);
    //     setTimeout(() => setShow2(!show2), 2000);
    //     setTimeout(() => setShow2(!show2), 3000);
    //     setTimeout(() => setShow3(!show3), 4000);
    //     setTimeout(() => setShow3(!show3), 5000);
    // }, 6000);
    
    return (
        <div>
            { show1  ? <Spinner animation="grow" variant="danger" /> : null }
            { show2 ? <Spinner animation="grow" variant="info" /> : null }
            { show3 ? <Spinner animation="grow" variant="primary" /> : null }
       </div>
    )
}

export default Spin

import React, { Fragment } from 'react';
import { Container } from 'react-bootstrap'
import FormField from './components/Form/Form';
import Spin from './components/Form/Spinner'
import ShowModal from './ShowModal';
import ShowNavbar from './components/ShowNavBar'
import ExamContextProvider from './context/ExamContextProvider'

function App() {
  return (
    <ExamContextProvider>
        <ShowNavbar />
        <Container>
          <ShowModal />
          <h2 className="display-4 mt-4">Upload Question</h2>
          <Spin />
          <FormField />
        </Container>
    </ExamContextProvider> 
  );
}

export default App;

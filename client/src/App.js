import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import ShowNavbar from './components/ShowNavBar'
import ExamContextProvider from './context/ExamContextProvider'
import Success from './components/Success'
import Form from './components/Form/Form'

function App() {
  return (
    <ExamContextProvider>
      <Router>
        <ShowNavbar />
          <Container>
          <Switch>
            <Route exact path="/success" component={Success} />
            <Route exact path="/" component={Form} />
          </Switch>
          </Container>
      </Router>
        
    </ExamContextProvider> 
  );
}

export default App;

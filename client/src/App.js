import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import ShowNavbar from './components/ShowNavBar'
import ExamContextProvider from './context/ExamContextProvider'
import Preview from './components/Preview'
import ErrorPage from './components/Error'
import Form from './components/Form/Form'
import Success from './components/Success';
import EditExam from './components/Form/EditExam';
import Allexams from './components/Allexams';

function App() {
  return (
      <Router>
        <ExamContextProvider>
          <ShowNavbar />
          <Container>
            <Switch>
              <Route exact path="/preview" component={Preview} />
              <Route exact path="/success" component={Success} />
              <Route exact path="/form" component={Form} />
              <Route exact path="/exams" component={Allexams} />
              <Route exact path="/edit/:edit" component={EditExam} />
              <Route exact path="/error" component={ErrorPage} />
              <Route component={Form} />
            </Switch>
          </Container>
        </ExamContextProvider> 
      </Router>
        
  );
}

export default App;

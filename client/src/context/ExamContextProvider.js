import React, { createContext, useState } from 'react'

export const ExamContext = createContext();

const ExamContextProvider = (props) => {
    let [exam, setExam ] = useState({
        category: '',
        subject: '',
        year: '',
        questions: [],
        numberofquestions: '',
        currentquestion: ''
    });

    return (
        <ExamContext.Provider value={{ exam, setExam}}>
            {props.children}
        </ExamContext.Provider>
    )
}

export default ExamContextProvider

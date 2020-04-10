import React, { createContext, useState } from 'react'

export const ExamContext = createContext();

const ExamContextProvider = (props) => {
    let [exam, setExam ] = useState({
        category: '',
        questionType: '',
        subject: '',
        year: '',
        questions: [],
        meta: {},
        numberofquestions: '',
        currentquestion: '',
        current: '',
        respMessage: false
    });

    const submitExam = async () => {
        let { category, questionType, subject, year, questions,meta } = exam;
        let examRequest = { category, questionType, subject, year, questions };
        const res = await fetch ('https://urimmapp.herokuapp.com/questions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(examRequest)
        });
         let data = await res.json();
        return data
    };

    const updateQuestion = (question) => {
        setExam({
            ...exam,
             questions : exam.questions.map((quest, index) => index === question.id ? {...question} : {...quest})
            });
    }

    return (
        <ExamContext.Provider value={{ exam, setExam, submitExam, updateQuestion}}>
            {props.children}
        </ExamContext.Provider>
    )
}

export default ExamContextProvider

import React, { createContext, useState } from 'react'

export const ExamContext = createContext();

const ExamContextProvider = (props) => {
    let [exam, setExam ] = useState({
        category: '',
        year: '',
        questions: [],
        meta: {},
        numberofquestions: '',
        currentquestion: '',
        current: '',
        respMessage: false
    });

    const submitExam = async () => {
        let { category, year, questions,meta } = exam;
        let examRequest = { category, year, questions, meta };
        const res = await fetch ('https://urimmapp.herokuapp.com/questions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(examRequest)
        });
         let data = await res.json();
         setExam({
            category: '',
            year: '',
            questions: [],
            meta: {},
            numberofquestions: '',
            currentquestion: '',
            current: '',
            respMessage: false
        });
        return data
    };

    const updateQuestion = (question) => {
        setExam({
            ...exam,
             questions : exam.questions.map((quest, index) => index === question.id ? {...question} : {...quest})
            });
    }

    // const checkStorage = () => {
    //     if(exam.questions.length > 0) {
    //         let exam = localStorage.getItem('exam');
    //         setExam(exam);
    //     }

    //     if (exam.questions.length === 0) {
    //         localStorage.removeItem('exam');
    //     }
    // }

    // const saveToStorage = () => {
    //     localStorage.removeItem('exam');
    //     localStorage.setItem('exam', JSON.stringify(exam));
    // }

    return (
        <ExamContext.Provider value={{ exam, setExam, submitExam, updateQuestion }}>
            {props.children}
        </ExamContext.Provider>
    )
}

export default ExamContextProvider

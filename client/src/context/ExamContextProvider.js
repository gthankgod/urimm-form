import React, { createContext, useState, useEffect } from 'react'

export const ExamContext = createContext();


let storage = JSON.parse(localStorage.getItem('exam'));

const ExamContextProvider = (props) => {
    let newstorage = storage && storage.questions.length > 0 ? storage : {
        category: '',
        year: '',
        questions: [],
        meta: {},
        numberofquestions: '',
        currentquestion: '',
        current: '',
        respMessage: false
    };

    let [exam, setExam ] = useState(newstorage);

    useEffect(() => {
        localStorage.setItem('exam', JSON.stringify(exam));
    }, [exam]);


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

    return (
        <ExamContext.Provider value={{ exam, setExam, submitExam, updateQuestion }}>
            {props.children}
        </ExamContext.Provider>
    )
}

export default ExamContextProvider

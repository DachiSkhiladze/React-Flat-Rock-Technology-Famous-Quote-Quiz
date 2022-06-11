import React, { useState } from 'react';
import Question from './Question'


export default function Quiz({type}) {
    const [question, setQuestion] = useState({});
    const [showAnswerButtons, setShowAnswerButtons] = useState(false);
    const getQuestion = async () => {
        var jwd = localStorage.getItem('token');
        console.log(jwd);
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',
                        'Authorization': `Bearer ${jwd}`}
        };
        var url = `https://localhost:7120/Questions/GetQuestion/${type}`;
        const response = await fetch(url, requestOptions);
        console.log(response);
        if(response.status === 200){
            const result = await response.json();
            setQuestion(result);
        }
        else{
            //window.location = "/SignIn";
        }
        return true;
    }
    const handleSubmit = (e) => {
        setShowAnswerButtons(true);
        e.preventDefault();
        getQuestion();
    };

    return (
        <div className='Quiz'>
            <div className='jwt'>
                <Question question = {question}
                         showAnswerButtons = {showAnswerButtons}
                         setShowAnswerButtons = {setShowAnswerButtons}
                         type = {type}/>
                {
                    !showAnswerButtons && 
                    <button onClick={handleSubmit} className="btn" type="submit">
                        Get Next Question
                    </button>
                }
            </div>
        </div>
    );
}
import React, { useState, useEffect } from 'react';

export default function BinaryAnswers({answers, showAnswerButtons, setShowAnswerButtons}) {
  const [result, setResult] = useState('');

  const handleAnswer = (answerId) => {
    console.log(answerId);
    submitAnswer(answerId);
  }

  const submitAnswer = async (answerId) => {
    setShowAnswerButtons(false);
    var jwd = localStorage.getItem('token');
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwd}`}
    };
    const response = await fetch(`https://localhost:7120/Questions/AnswerQuestion/${answerId}`, requestOptions);
    
    if(response.status === 200){
        const result = await response.json();
        console.log(result);
        if(result.id === answerId){
          setResult(`Correct! The right answer is: ${result.text}`);
        }
        else{
          setResult(`Sorry, you are wrong! The right answer is: ${result.text}`);
        }
    }
}

  if(answers && showAnswerButtons) {
    console.log(answers[0]);
        return (
            <div>
                {answers.map(answer => {
                  return <button className='BinaryQuestionButton'
                  style={answer.text==='Yes'?{backgroundColor:'green'}:{backgroundColor:'red'}}
                  onClick={() => handleAnswer(answer.id)}
                  key={answer.id}>{answer.text}</button>;
                })}
            </div>
        );
  }
  else{
    if(result){
      return (
        <div className='Result'><h1>{result}</h1></div>
      );
    }
  }
}
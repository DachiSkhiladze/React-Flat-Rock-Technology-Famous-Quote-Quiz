import React, { useState, useEffect } from 'react';
import BinaryAnswers from './BinaryAnswers.js'
import MultipleAnswers from './MultipleAnswers.js'

export default function Question({question, showAnswerButtons, setShowAnswerButtons, type}) {
    // const val =  console.log(question?.text);
    return (
        <div className='Question'>
                <h1 className='title'>Who Said It?</h1>
                <h1>{question.text}</h1>
                <h1 className='author'>{question.authorName}</h1>
                {type === 'MultipleChoiceQuestions' ? 
                <MultipleAnswers answers = {question.answers} 
                        showAnswerButtons = {showAnswerButtons}
                        setShowAnswerButtons = {setShowAnswerButtons}/>
                         :
                <BinaryAnswers answers = {question.answers} 
                        showAnswerButtons = {showAnswerButtons}
                        setShowAnswerButtons = {setShowAnswerButtons}/>     
                        }   
        </div>
    );
}
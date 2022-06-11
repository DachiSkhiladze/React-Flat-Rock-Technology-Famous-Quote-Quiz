import React, { useNavigation, useState } from 'react';
import {useNavigate} from 'react-router-dom';

export default function InsertMultipleChoiceQuestion() {

// States for api response
const [response, setResponse] = useState('');

// Navigation
const navigate = useNavigate();

//const navigate = useNavigation();

// States for registration
const [quote, setQuote] = useState('quote text');
const [author, setAuthor] = useState('author name');
const [answer1, setAnswer1] = useState('answer 1');
const [answer2, setAnswer2] = useState('answer 2');
const [answer3, setAnswer3] = useState('answer 3');

// States for checking the errors
const [submitted, setSubmitted] = useState(false);
const [error, setError] = useState(false);

// Handling the response change
// Handling the email change
const handleQuote = (e) => {
	setQuote(e.target.value);
};

const handleAuthor = (e) => {
	setAuthor(e.target.value);
};

const handleAnswer = (e, setAnswer) => {
	setAnswer(e.target.value);
};

// Handling the form submission
const handleSubmit = (e) => {
	e.preventDefault();
	if (quote === '' || author === '') {
	setError(true);
	} else {
	send();
	setError(false);
	}
};

// Showing success message
const successMessage = () => {
	return (
	<div
		className="success"
		style={{
		display: submitted ? '' : 'none',
		}}>
		<h1 className='error'>{response}</h1>
	</div>
	);
};

// Showing error message if error is true
const errorMessage = () => {
	return (
	<div
		className="error"
		style={{
		display: error ? '' : 'none',
		}}>
		<h1>Please enter all the fields</h1>
	</div>
	);
};

const send = async () => {
    try{
        var questionObject = {id: 0,
            text: quote,
            authorName: author,
            isBinary: true,
            answers: [
                {
                    id: 0,
                    questionID: 0,
                    text: answer1,
                    isCorrect: true
                },
                {
                    id: 0,
                    questionID: 0,
                    text: answer2,
                    isCorrect: false
                },
                {
                    id: 0,
                    questionID: 0,
                    text: answer3,
                    isCorrect: false
                }
            ]
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(questionObject)
        };
        const response = await fetch('https://localhost:7120/CreateQuestion/MultipleChoiceQuestions', requestOptions);
		

        const result = await response.json();
        if (response.status === 200) {
            setResponse("Success");
			navigate('/QuoteManagement');
            return true;
        }
		else{
			setResponse(JSON.stringify(result, null, 4).split('"')[3]);
		}
    }
    catch(err){

    }
}

return (
	<div className="form">
	<div>
		<h1>Insert Multiple Choice Question</h1>
	</div>

	{/* Calling to the methods */}
	<div className="messages">
		{errorMessage()}
		{successMessage()}
	</div>

	<form>
		{/* Labels and inputs for form data */}

		<label className="label">Quote</label>
		<input onChange={handleQuote} className="input"
		value={quote} type="text" />
        
        <label className="label">Author</label>
		<input onChange={handleAuthor} className="input"
		value={author} type="text" />

        <label className="label">Answer 1</label>
		<input onChange={(e) => handleAnswer(e, setAnswer1)} className="input"
		value={answer1} type="text" />

		<label className="label">Answer 2</label>
		<input onChange={(e) => handleAnswer(e, setAnswer2)} className="input"
		value={answer2} type="text" />

		
		<label className="label">Answer 3</label>
		<input onChange={(e) => handleAnswer(e, setAnswer3)} className="input"
		value={answer3} type="text" />


		<button onClick={handleSubmit} className="btn" type="submit">
		Submit
		</button>
	</form>
	</div>
);
}

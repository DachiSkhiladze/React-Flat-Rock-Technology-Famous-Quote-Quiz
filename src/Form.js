import React, { useNavigation, useState } from 'react';

export default function Form() {

// States for api response
const [response, setResponse] = useState('');

// Navigation
//const navigate = useNavigation();

// States for registration
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

// States for checking the errors
const [submitted, setSubmitted] = useState(false);
const [error, setError] = useState(false);

// Handling the response change
const handleResponse = (e) => {
    setResponse(e);
}

// Handling the email change
const handleEmail = (e) => {
	setEmail(e.target.value);
	setSubmitted(false);
};

// Handling the password change
const handlePassword = (e) => {
	setPassword(e.target.value);
	setSubmitted(false);
};

// Handling the form submission
const handleSubmit = (e) => {
	e.preventDefault();
	if (email === '' || password === '') {
	setError(true);
	} else {
	setSubmitted(true);
    register();
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

const register = async () => {
    try{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password,
                firstName: "string",
                lastName: "string",
                isDisabled: true,
                roles: [
                "string"
                ]
            })
        };
        const response = await fetch('https://localhost:7120/User/Register', requestOptions);
        if (response.status == 200) {
            setResponse("Success");
			window.location = '/SignIn';
            return true;
        }
		else{
			const result = await response.json();
			setResponse(JSON.stringify(result, null, 4).split('"')[3]);
		}
    }
    catch(err){

    }
}

return (
	<div className="form">
	<div>
		<h1>Sign Up</h1>
	</div>

	{/* Calling to the methods */}
	<div className="messages">
		{errorMessage()}
		{successMessage()}
	</div>

	<form>
		{/* Labels and inputs for form data */}

		<label className="label">Email</label>
		<input onChange={handleEmail} className="input"
		value={email} type="email" />

		<label className="label">Password</label>
		<input onChange={handlePassword} className="input"
		value={password} type="password" />

		<button onClick={handleSubmit} className="btn" type="submit">
		Submit
		</button>
	</form>
	</div>
);
}

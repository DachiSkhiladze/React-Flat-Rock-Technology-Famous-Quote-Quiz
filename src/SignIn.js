import React, { useNavigation, useState } from 'react';
import {useNavigate} from 'react-router-dom';

export default function SignIn({checkAdminConnection, setAdmin, setIsSignedIn}) {

// States for api response
const [response, setResponse] = useState('');

// Navigation
const navigate = useNavigate();

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
    signIn();
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

const signIn = async () => {
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
        const response = await fetch('https://localhost:7120/User/LogIn', requestOptions);
		

        const result = await response.json();
        if (response.status === 202) {
            setResponse("Success");
//           navigate('/');
			saveJWT(JSON.stringify(result, null, 4).split('"')[3]);
			setIsSignedIn(true);
			navigate('/');
			checkAdminConnection();
            return true;
        }
		else{
			setResponse("Credentials Are Not Correct or Account Is Disabled By Admin");
		}
    }
    catch(err){

    }
}

const saveJWT = (jwt) => {
	localStorage.setItem('token', jwt);
	var bubu = localStorage.getItem('token');
	console.log(bubu);
	setResponse("Success");
} 

return (
	<div className="form">
	<div>
		<h1>Sign In</h1>
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

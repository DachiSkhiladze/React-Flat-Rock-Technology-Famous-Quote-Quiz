import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

function QuotesManagement() {
    const [questions, setQuestions] = useState([]);
    const getQuestions = async () => {
        var jwd = localStorage.getItem('token');
        console.log(jwd);
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',
                        'Authorization': `Bearer ${jwd}`}
        };
        var url = `https://localhost:7120/GetQuestions`;
        const response = await fetch(url, requestOptions);
        console.log(response);
        if(response.status === 200){
            const result = await response.json();
            setQuestions(result);
        }
        else{
            //window.location = "/SignIn";
        }
    }

    const handleDisableOrEnable  = async (id) => {
        var jwd = localStorage.getItem('token');
        console.log(jwd);
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',
                        'Authorization': `Bearer ${jwd}`}
        };
        var url = `https://localhost:7120/DisableOrEnableUser/${id}`;
        const response = await fetch(url, requestOptions);
        console.log(response);
        if(response.status === 200){
            const result = await response.json();
            console.log(questions);
            window.location.reload(false);
        }
        else{
            //window.location = "/SignIn";
        }
    }

    const handleHistory = (id) => {
        window.location = `/History/${id}`;
    }

    const handleDelete  = async (id) => {
        var jwd = localStorage.getItem('token');
        console.log(jwd);
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',
                        'Authorization': `Bearer ${jwd}`}
        };
        var url = `https://localhost:7120/DeleteQuote/${id}`;
        const response = await fetch(url, requestOptions);
        console.log(response);
        if(response.status === 200){
            window.location.reload(false);
        }
        else{
            //window.location = "/SignIn";
        }
    }

    const handleUpdateEmail = async (id) => {
        var text;
        for(var i = 0; i < questions.length; i++){
            if(questions[i].id == id){
                if(questions){
                    text = questions[i].text;
                }
            }
        }
        var jwd = localStorage.getItem('token');
        console.log(jwd);
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',
                        'Authorization': `Bearer ${jwd}`}
        };
        var url = `https://localhost:7120/UpdateQuote/${id}/${text}`;
        const response = await fetch(url, requestOptions);
        console.log(response);
        if(response.status === 200){
            window.location.reload(false);
        }
        else{
            //window.location = "/SignIn";
        }
    }
    
    const handleQuestionChange = (e, id) => {
        var arr = questions;
        for(var i = 0; i < questions.length; i++){
            if(questions[i].id == id){
                arr[i].text = e.target.value;
            }
        }
        setQuestions(arr);
    }

    useEffect(() => {
        getQuestions();
      }, []);

    if(questions && questions[0]){
        return (
            <div>
                <h1>Quotes</h1>
                <button className='insertBtn'><Link to="/InsertBinaryQuestion">Insert Binary Question</Link></button>
                <button className='insertBtn'><Link to="/InsertMultipleChoiceQuestion">Insert Multiple Choice Question</Link></button>
                {questions.map(question => {
                     return <div className='userLine' key={question.id}>
                        <input onChange={(e) => handleQuestionChange(e, question.id)} defaultValue={question.text}/>
                        <button onClick={() => handleUpdateEmail(question.id)} className='UpdateUser'>Update</button>
                        <button onClick={() => handleDelete(question.id)} className='DeleteUser'>Delete</button>
                    </div>;
                })}
            </div>
        );
    }
}


export default QuotesManagement;
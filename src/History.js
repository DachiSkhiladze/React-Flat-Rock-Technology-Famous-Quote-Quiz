import React, { useState, useEffect } from 'react';
import {useParams} from "react-router-dom";
  

function History() {
    const [history, setHistory] = useState([]);
    let {id} = useParams();
    
    useEffect(() => {
        getHistory();
      }, []);
      var obj = {};
    const getHistory  = async () => {
        var jwd = localStorage.getItem('token');
        console.log(jwd);
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',
                        'Authorization': `Bearer ${jwd}`}
        };
        var url = `https://localhost:7120/User/GetUserHistory/${id}`;
        const response = await fetch(url, requestOptions);
        console.log(response);
        if(response.status === 200){
            var result = await response.json();
            setHistory(result);
            obj = result;
            console.log(result);
        }
        else{
            //window.location = "/SignIn";
        }
    }

    if(history && history[0] && history[0].userAnsweredQuestion){
            return (
                <div>
                    {history.map(his => {
                    return <div
                    key={his.userAnsweredQuestion.id}><h1>Question :</h1> <h2 style={his.wasCorrect ? { color: 'green' } : { color: 'red' }}>{his.questionText}</h2></div>;
                    }
                )}
                </div>
            );
    }
}

export default History;
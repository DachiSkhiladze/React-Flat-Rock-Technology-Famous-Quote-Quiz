import React, { useEffect, useState } from 'react';

function UserManagement() {
    const [users, setUsers] = useState([]);
    const [userEmail, setUserEmail] = useState([]);
    const [history, setHistory] = useState([]);
    const getUsers = async () => {
        var jwd = localStorage.getItem('token');
        console.log(jwd);
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',
                        'Authorization': `Bearer ${jwd}`}
        };
        var url = `https://localhost:7120/User/GetUsers`;
        const response = await fetch(url, requestOptions);
        console.log(response);
        if(response.status === 200){
            const result = await response.json();
            setUsers(result);
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
            console.log(users);
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
        var url = `https://localhost:7120/DeleteUser/${id}`;
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
        var newUserEmail;
        for(var i = 0; i < users.length; i++){
            if(users[i].id == id){
                if(users){
                    console.log(users.email);
                    newUserEmail = users[i].email;
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
        var url = `https://localhost:7120/UpdateUserEmail/${id}/${newUserEmail}`;
        const response = await fetch(url, requestOptions);
        console.log(response);
        if(response.status === 200){
            window.location.reload(false);
        }
        else{
            //window.location = "/SignIn";
        }
    }
    
    const handleEmailChange = (e, id) => {
        var arr = users;
        for(var i = 0; i < users.length; i++){
            if(users[i].id == id){
                arr[i].email = e.target.value;
            }
        }
        setUsers(arr);
    }

    useEffect(() => {
        getUsers();
      }, []);

    if(users){
       // console.log(users[0]);
        return (
            <div>
                <h1>Users</h1>
                {users.map(user => {
                     return <div className='userLine' key={user.email}>
                        <input onChange={(e) => handleEmailChange(e, user.id)} defaultValue={user.email}/>
                        <button onClick={() => handleHistory(user.id)} className='GetData'>
                            Get User History
                        </button>
                        <button onClick={() => handleUpdateEmail(user.id)} className='UpdateUser'>Update</button>
                        <button onClick={() => handleDelete(user.id)} className='DeleteUser'>Delete</button>
                        {user.isDisabled ? 
                        <button onClick={() => handleDisableOrEnable(user.id)} className='EnableUser'> Enable</button> :
                        <button onClick={() => handleDisableOrEnable(user.id)} className='DisableUser'>Disable</button>
                        }
              
                    </div>;
                })}
            </div>
        );
    }
}


export default UserManagement;
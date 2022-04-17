import React, { useState } from 'react'
import { users,addNode } from '../Helper';

export default function AddUser() {
    const [userName, setUserName] = useState();
    const [error, setError] = useState();

    function addUser(e) {
        e.preventDefault();
        if(!userName) setError("Enter the username.");
        const userExists = users.find(
            (user) => user.toLowerCase() === userName.toLowerCase()
        );
        if (userExists) setError("User already exists");
        users.push(userName);
        addNode(userName);

        //getUserOptions();
        //getFriendsOptions();
        setError("");
        setUserName("");

        localStorage.setItem("users", JSON.stringify(users));
    };





    return (
        <div>
            <form onSubmit={addUser}>
                <input type="text" id="user-input" className="user-input" value={userName} onChange={(e) => { e.preventDefault(); setUserName(e.target.value) }} />
                {error}
                <button id="add-user">Add user</button>
            </form>
            {users.map((value)=><div>{value}</div>)}
        </div>
    )
}

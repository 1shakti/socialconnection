import React, { useState } from 'react'
import { users, addNode } from '../Helper';
import { FriendList } from './FriendList';

export default function User() {
    const [userName, setUserName] = useState();
    const [error, setError] = useState();

    function addUser(e) {
        e.preventDefault();
        if (!userName) setError("Enter the username.");

        if (userName) {
            const userExists = users.find(
                (user) => user.toLowerCase() === userName.toLowerCase()
            );
            if (userExists) {
                setError("User already exists");
            } else {
                users.push(userName);
                addNode(userName);

                setError("");
                setUserName("");

                localStorage.setItem("users", JSON.stringify(users));
            }
        }
    };





    return (
        <div id="app">
            <div className="main">
                <form onSubmit={addUser}>
                    <input type="text" id="user-input" className="user-input" placeholder="Enter the username" value={userName} onChange={(e) => { e.preventDefault(); setUserName(e.target.value) }} />
                    <div id="error">
                        {error}
                    </div>
                    <button id="add-user">Add user</button>
                </form>
                <FriendList users={users} />
            </div>
            <div className="users-list-parent">
                <ul id="users-list">
                    {users.map((value) => <li key={value}>{value}</li>)}
                </ul>
            </div>
        </div>
    )
}

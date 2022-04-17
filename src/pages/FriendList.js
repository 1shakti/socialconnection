import React, { useState } from "react";
import { addEdge, findPaths } from "../Helper";

export function FriendList({ users }) {
    const [selectedUser, setSelectedUser] = useState("");
    const [selectedFriend, setSelectedFriend] = useState("");
    const [path, setPath] = useState("");

    const [error, setError] = useState();


    function addEdgeBtn(e) {
        e.preventDefault();
        if (!selectedUser) setError("No user selected");
        else if (!selectedFriend) setError("No friend selected to add");

        
        if (selectedUser && selectedFriend) {
            setError(addEdge(selectedUser, selectedFriend));
        }

    };

    function findEdgeBtn(e) {
        e.preventDefault();
        if (!selectedUser) setError("No user selected");
        else if (!selectedFriend) setError("No friend selected to add");

        if (selectedUser && selectedFriend) {
            const paths = findPaths(selectedUser, selectedFriend);

            setPath(paths.map((value) => <div key={`edge-${value}`}>{value.join("->")}</div>));
            setError("");
        }

    };

    return (
        <>
            <div>Friend List: <span id="friend-list">{selectedUser && users.filter((user) => user !== selectedUser).join()}</span></div>

            <form>
                <select id="user-select" onChange={(e) => { setSelectedUser(e.target.value) }}>
                    <option value="">Select User</option>
                    {
                        users.map((user) => <option key={`User-${user}`}>{user}</option>)
                    }
                </select>
                <select id="freind-select" onChange={(e) => { setSelectedFriend(e.target.value) }}>
                    <option value="">Select Friend</option>
                    {
                        users.filter((user) => user !== selectedUser).map((user) => <option key={`Friend-${user}`}>{user}</option>)
                    }
                </select>
                <div className="edge-btn-group">
                    <button id="add-edge" onClick={addEdgeBtn}>Add Edge</button>
                    <button id="find-edge" onClick={findEdgeBtn}>Find Edges</button>
                </div>
            </form>
            <div id="error">
                {error}
            </div>
            <div id="edges">
                {path}
            </div>

        </>
    );

}
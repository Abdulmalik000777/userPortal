// File: src/components/AdminPanel.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminPanel() {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
        // Fetch users from the API
        axios.get('/api/users').then(response => {
            setUsers(response.data);
        });
    }, []);

    const handleSelectAll = () => {
        if (selectedUsers.length === users.length) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(users.map(user => user.id));
        }
    };

    const handleSelectUser = (userId) => {
        setSelectedUsers(prev => 
            prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
        );
    };

    const handleAction = async (action) => {
        await axios.patch(`/api/users/${action}`, { ids: selectedUsers });
        // Refresh user list
        const response = await axios.get('/api/users');
        setUsers(response.data);
    };

    return (
        <div className="container">
            <h2>User Management</h2>
            <div className="toolbar">
                <button onClick={() => handleAction('block')} className="btn btn-danger">Block</button>
                <button onClick={() => handleAction('unblock')} className="btn btn-success">Unblock</button>
                <button onClick={() => handleAction('delete')} className="btn btn-danger">Delete</button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th><input type="checkbox" onClick={handleSelectAll} checked={selectedUsers.length === users.length} /></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Last Login</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td><input type="checkbox" checked={selectedUsers.includes(user.id)} onChange={() => handleSelectUser(user.id)} /></td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.last_login}</td>
                            <td>{user.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminPanel;

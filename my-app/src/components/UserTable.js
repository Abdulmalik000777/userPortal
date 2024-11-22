import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Form, Button } from 'react-bootstrap';

const UserTable = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    axios.get('/api/users', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
      setUsers(response.data);
    });
  }, [token]);

  const handleSelectAll = () => {
    setSelectedUsers(selectedUsers.length === users.length ? [] : users.map(user => user.id));
  };

  const handleSelect = (id) => {
    setSelectedUsers(selectedUsers.includes(id) ? selectedUsers.filter(uid => uid !== id) : [...selectedUsers, id]);
  };

  const handleBlock = () => {
    axios.patch('/api/users/block', { ids: selectedUsers }, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => {
      // Fetch updated user list
      axios.get('/api/users', { headers: { Authorization: `Bearer ${token}` } })
        .then(response => setUsers(response.data));
    });
  };

  const handleUnblock = () => {
    axios.patch('/api/users/unblock', { ids: selectedUsers }, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => {
      // Fetch updated user list
      axios.get('/api/users', { headers: { Authorization: `Bearer ${token}` } })
        .then(response => setUsers(response.data));
    });
  };

  const handleDelete = () => {
    axios.delete('/api/users', {
      headers: { Authorization: `Bearer ${token}` },
      data: { ids: selectedUsers }
    }).then(() => {
      // Fetch updated user list
      axios.get('/api/users', { headers: { Authorization: `Bearer ${token}` } })
        .then(response => setUsers(response.data));
    });
  };

  return (
    <div>
      <div className="toolbar mb-3">
        <Button variant="primary" onClick={handleBlock}>Block</Button>
        <Button variant="success" onClick={handleUnblock}>Unblock</Button>
        <Button variant="danger" onClick={handleDelete}>Delete</Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th><Form.Check type="checkbox" onChange={handleSelectAll} checked={selectedUsers.length === users.length} /></th>
            <th>Name</th>
            <th>Email</th>
            <th>Last Login</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td><Form.Check type="checkbox" checked={selectedUsers.includes(user.id)} onChange={() => handleSelect(user.id)} /></td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.last_login}</td>
              <td>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserTable;

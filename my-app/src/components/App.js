import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import UserTable from './components/UserTable';
import Login from './components/Login';
import Register from './components/Register';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [token, setToken] = useState('');

  return (
    <Router>
      <div className="container mt-5">
        <Switch>
          <Route path="/login">
            {!token ? <Login setToken={setToken} /> : <Redirect to="/users" />}
          </Route>
          <Route path="/register">
            {!token ? <Register /> : <Redirect to="/users" />}
          </Route>
          <Route path="/users">
            {token ? <UserTable token={token} /> : <Redirect to="/login" />}
          </Route>
          <Route path="/">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;

import React, { useState } from 'react';
import './AdminLogin.css';
import { Link } from 'react-router-dom';

function AdminLogin() {
   const [state, setState] = useState({
      username: '',
      password: '',
      loading: false,
   });

   function handleState(e) {
      setState({ ...state, [e.target.name]: e.target.value });
   }

   async function login() {
      try {
         //    if (!state.username) {
         //       setMessage({ message: 'Enter a username', error: true });
         //       return;
         //    }
         //    if (!state.password) {
         //       setMessage({
         //          message: 'Enter a password',
         //          error: true,
         //       });
         //       return;
         //    }
         //    clearMessage();
         //    setState((prevState) => ({ ...prevState, loading: true }));
         //    const res = await API.post(
         //       '/user/login',
         //       {
         //          username: state.username,
         //          password: state.password,
         //       },
         //       { withCredentials: true }
         //    );
         //    setState((prevState) => ({ ...prevState, loading: false }));
         //    if (res.data) {
         //       auth.login(res.data, () => history.replace(from));
         //    }
      } catch (err) {
         // setState((prevState) => ({ ...prevState, loading: false }));
         // logger('login', err);
         // if (err.response) {
         //    setMessage({ message: err.response.data, error: true });
         // }
      }
   }

   return (
      <div className="admin-login-container">
         <div className="admin-login-card">
            <h3>Covid Tracker Admin</h3>
            <input
               type="username"
               name="username"
               id="username"
               placeholder="Username"
               value={state.username}
               onChange={handleState}
            />
            <input
               type="password"
               name="password"
               id="password"
               placeholder="Password"
               value={state.password}
               onChange={handleState}
            />

            <button className="admin-login-button" onClick={login}>
               Login
            </button>
            <div className="login-divider"></div>
            <Link className="login-links" to="/login">
               <button className="normal-login-button">Patient Login</button>
            </Link>
         </div>
      </div>
   );
}

export default AdminLogin;

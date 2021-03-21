import React, { useState } from 'react';
import './AdminLogin.css';
import auth from '../auth/auth';
import API from '../utils/API';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import { useStateValue } from '../state/StateProvider';

function AdminLogin() {
   const history = useHistory();
   const location = useLocation();
   const { from } = location.state || { from: { pathname: '/' } };

   const [{ reload }, dispatch] = useStateValue();
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
         if (!state.username || !state.password) {
            alert('Enter all fields');
            return;
         }

         setState((prevState) => ({ ...prevState, loading: true }));
         const res = await API.post(
            '/user/login',
            {
               username: state.username,
               password: state.password,
            },
            { withCredentials: true }
         );
         console.log(res.data);
         dispatch({
            type: 'SET_RELOAD',
            reload: !reload,
         });
         setState((prevState) => ({ ...prevState, loading: false }));

         auth.login(res.data, () => history.replace(from));
      } catch (err) {
         setState((prevState) => ({ ...prevState, loading: false }));
         console.log(err);
      }
   }

   return auth.isAuthenticated() ? (
      <Redirect to={from} />
   ) : (
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

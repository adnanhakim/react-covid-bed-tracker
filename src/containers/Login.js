import React, { useState } from 'react';
import './Login.css';
import illustration from '../login-illustration.svg';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import firebase from '../utils/firebase';
import API from '../utils/API';
import auth from '../auth/auth';
import { useStateValue } from '../state/StateProvider';

function Login() {
   const history = useHistory();
   const location = useLocation();
   const { from } = location.state || { from: { pathname: '/' } };

   const [{ reload }, dispatch] = useStateValue();
   const [mobileNumber, setMobileNumber] = useState('');

   async function sendOTP() {
      if (!mobileNumber || mobileNumber.length !== 10) {
         alert('Not a valid mobile number');
         return;
      }

      const reCaptcha = new firebase.auth.RecaptchaVerifier(
         'recaptcha-container'
      );

      try {
         const event = await firebase
            .auth()
            .signInWithPhoneNumber('+91' + mobileNumber, reCaptcha);
         const code = prompt('Enter OTP');

         const res = await event.confirm(code);
         console.log(res.user?.uid);
         login(res.user?.uid);
      } catch (err) {
         console.log(err);
      }
   }

   async function login(uid) {
      try {
         const res = await API.post('/user/save', {
            uid,
            mobileNumber: '+91' + mobileNumber,
         });

         dispatch({
            type: 'SET_RELOAD',
            reload: !reload,
         });

         auth.login(res.data?.userToken, () => history.replace(from));
      } catch (err) {
         console.log(err);
      }
   }

   return auth.isAuthenticated() ? (
      <Redirect to={from} />
   ) : (
      <div className="login">
         <header>COVID Tracker</header>
         <div className="login-container">
            <div className="login-left">
               <img src={illustration} alt="" />
            </div>
            <div className="login-right">
               <div className="login-card">
                  <h3>Login</h3>
                  <input
                     type="number"
                     name="mobileNumber"
                     id="mobileNumber"
                     value={mobileNumber}
                     onChange={(e) => setMobileNumber(e.target.value)}
                     placeholder="Enter your 10 digit mobile number"
                  />

                  <div id="recaptcha-container"></div>

                  <button className="login-btn" onClick={sendOTP}>
                     Verify and Login
                  </button>
                  <Link className="link admin-login-btn" to="/admin/login">
                     Admin Login
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Login;

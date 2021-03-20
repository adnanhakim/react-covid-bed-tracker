import React, { Component } from 'react';
import firebase from '../utils/firebase';

class Request extends Component {
   sendOTP = () => {
      console.log(firebase);
      let reCaptcha = new firebase.auth.RecaptchaVerifier(
         'recaptcha-container'
      );
      let phoneNumber = '+918879556639';
      try {
         firebase
            .auth()
            .signInWithPhoneNumber(phoneNumber, reCaptcha)
            .then((event) => {
               let code = prompt('Enter OTP Code', '');
               event
                  .confirm(code)
                  .then((result) => {
                     console.log(result.user);
                  })
                  .catch((error) => {
                     console.log('jejej');
                     console.log(error);
                  });
            });
      } catch (error) {
         console.log(console.error());
      }
   };

   render() {
      return (
         <div className="section">
            <div id="recaptcha-container"></div>
            <input type="text"></input>
            <button id="submit" onClick={this.sendOTP}>
               Submit
            </button>
         </div>
      );
   }
}

export default Request;

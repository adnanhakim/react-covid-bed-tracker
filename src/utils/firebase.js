import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
   apiKey: 'AIzaSyDc5qPlJAVQcQbDYxt2nEZJ8KKQc9dayRs',
   authDomain: 'covid-bed.firebaseapp.com',
   projectId: 'covid-bed',
   storageBucket: 'covid-bed.appspot.com',
   messagingSenderId: '854753753142',
   appId: '1:854753753142:web:7f78857621bb6ffea58097',
   measurementId: 'G-GG46GSJ08F',
};

firebase.initializeApp(firebaseConfig);

export default firebase;

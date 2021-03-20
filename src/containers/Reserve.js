/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react';
import './Reserve.css';
import API from '../utils/API';
import { useParams } from 'react-router';
import Loader from 'react-loader-spinner';
import firebase from '../utils/firebase';
import 'firebase/storage';
import { useStateValue } from '../state/StateProvider';

const storage = firebase.storage();

function Reserve() {
   const { id } = useParams();
   const [, dispatch] = useStateValue();

   const aadhaarRegex = '^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$';
   const [state, setState] = useState({
      name: '',
      age: '',
      aadhaar: '',
      type: 0,
      covidTrace: 0,
      loading: true,
      message: '',
   });
   const [file, setFile] = useState('');
   const [hospital, setHospital] = useState({});
   const [disabled, setDisabled] = useState(false);

   useEffect(() => {
      async function fetchHospitalInfo() {
         try {
            setState((prevState) => ({
               ...prevState,
               loading: true,
               message: 'Refreshing data',
            }));
            const res = await API.get(`/hospital/${id}`);

            setHospital(res.data?.data);
            if (state.type == 0 && hospital?.freenormalbeds <= 0) {
               setDisabled(true);
            } else if (state.type == 1 && hospital?.freeicuwithoutbeds <= 0) {
               setDisabled(true);
            } else if (state.type == 2 && hospital?.freeicubeds <= 0) {
               setDisabled(true);
            } else setDisabled(false);

            setState((prevState) => ({ ...prevState, loading: false }));
            dispatch({
               type: 'SET_SELECTED_HOSPITAL',
               selectedHospital: res.data?.data?.name,
            });

            dispatch({
               type: 'SET_SELECTED_HOSPITAL_ID',
               selectedHospitalId: res.data?.data?._id,
            });
            // setHospital(res.data?.data);
         } catch (err) {
            setState((prevState) => ({ ...prevState, loading: false }));
            console.log(err);
         }
      }

      fetchHospitalInfo();

      dispatch({
         type: 'SET_SIDEBAR',
         sidebar: 'RESERVE',
      });
   }, [id, dispatch]);

   useEffect(() => {
      if (state.type == 0 && hospital?.freenormalbeds <= 0) {
         setDisabled(true);
      } else if (state.type == 1 && hospital?.freeicuwithoutbeds <= 0) {
         setDisabled(true);
      } else if (state.type == 2 && hospital?.freeicubeds <= 0) {
         setDisabled(true);
      } else setDisabled(false);
   }, [
      state.type,
      hospital?.freenormalbeds,
      hospital?.freeicuwithoutbeds,
      hospital?.freeicubeds,
   ]);

   function handleState(e) {
      setState({ ...state, [e.target.name]: e.target.value });
   }

   async function handleImage(pdf) {
      const uploadTask = storage.ref(`pdf/${pdf.name}`).put(pdf);
      uploadTask.on(
         'state_changed',
         (snapshot) => {
            // progress function ...
         },
         (error) => {
            // Error function ...
            console.log(error);
            return error;
         },
         () => {
            // complete function ...
            storage
               .ref('pdf')
               .child(pdf.name)
               .getDownloadURL()
               .then((url) => {
                  console.log(url);
                  try {
                     let data = {
                        name: state.name,
                        age: state.age,
                        aadharCard: state.aadhaar,
                        type: state.type,
                        covidTrace: state.covidTrace,
                        pdfLink: url,
                        hospitalId: id,
                     };
                     API.post('/booking/reserve', data, {}).then((res) => {
                        setState((prevState) => ({
                           ...prevState,
                           loading: false,
                        }));
                        console.log(res.data);
                     });
                  } catch (err) {
                     setState((prevState) => ({
                        ...prevState,
                        loading: false,
                     }));
                  }
               });
         }
      );
   }

   async function reserveBed() {
      // try {
      if (!state.name || !state.age || !state.aadhaar) {
         alert('Enter all fields');
         return;
      }

      if (state.age < 0 || state.age > 150) {
         alert('Not a valid age');
         return;
      }

      if (!state.aadhaar.match(aadhaarRegex)) {
         alert('Not a valid aadhaar card');
         return;
      }

      setState((prevState) => ({
         ...prevState,
         loading: true,
         message: 'Reserving a bed',
      }));

      // let formData = new FormData();
      handleImage(file);

      // console.log(state.aadhaar)
      // let data = {
      //    name:state.name,
      //    age: state.age,
      //    aadharCard: state.aadhaar,
      //    type: state.type,
      //    covidTrace: state.covidTrace,
      //    pdfLink: pdfLink,
      //    hospitalId: id
      // }
      // formData.append('name', state.name);
      // formData.append('age', state.age);
      // formData.append('aadhaarCard', state.aadhaar);
      // formData.append('type', state.type);
      // formData.append('covidTrace', state.covidTrace);
      // const pdfLink = await handleImage(file)
      // formData.append('pdfLink', pdfLink);
      //    const res = await API.post('/booking/reserve', data, {

      //    });

      //    setState((prevState) => ({ ...prevState, loading: false }));
      //    console.log(res.data);
      // } catch (err) {
      //    setState((prevState) => ({ ...prevState, loading: false }));
      //    console.log(err);
      // }
   }

   return (
      <div className="section reserve">
         <div className="reserve-form">
            <h1>Reserve a bed</h1>
            <div className="reserve-details">
               <div className="reserve-container">
                  <h3 className="reserve-detail-header">Name*</h3>
                  <div className="reserve-detail-body">
                     <input
                        type="text"
                        name="name"
                        value={state.name}
                        onChange={handleState}
                        placeholder="Enter the name of the patient"
                     />
                  </div>
               </div>
               <div className="reserve-container">
                  <h3 className="reserve-detail-header">Age*</h3>
                  <div className="reserve-detail-body">
                     <input
                        type="number"
                        name="age"
                        className="reserve-detail-body"
                        value={state.age}
                        onChange={handleState}
                        placeholder="Enter the age of the patient"
                     />
                  </div>
               </div>
               <div className="reserve-container">
                  <h3 className="reserve-detail-header">Aadhar*</h3>
                  <div className="reserve-detail-body">
                     <input
                        type="number"
                        name="aadhaar"
                        className="reserve-detail-body"
                        value={state.aadhaar}
                        onChange={handleState}
                        placeholder="Enter the aadhaar card number of the patient"
                     />
                  </div>
               </div>

               <div className="reserve-container">
                  <h3 className="reserve-detail-header">Type*</h3>
                  <div className="reserve-detail-body">
                     <select
                        className=" reserve-select"
                        name="type"
                        value={state.type}
                        onChange={handleState}>
                        <option value="0">Normal Bed</option>
                        <option value="1">ICU without ventilator</option>
                        <option value="2">ICU with ventilator</option>
                     </select>
                  </div>
               </div>
               <div className="reserve-container">
                  <h3 className="reserve-detail-header">COVID Report</h3>
                  <div className="reserve-detail-body">
                     <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        accept=".pdf"
                     />
                  </div>
               </div>
               <div className="reserve-container">
                  <h3 className="reserve-detail-header">COVID Trace*</h3>
                  <div className="reserve-detail-body">
                     <select
                        className="reserve-select"
                        name="covidTrace"
                        value={state.covidTrace}
                        onChange={handleState}>
                        <option value="0">None</option>
                        <option value="1">
                           Travelled from a country with COVID alert
                        </option>
                        <option value="2">
                           Came in contact with COVID patient
                        </option>
                     </select>
                  </div>
               </div>
            </div>
            {!disabled && (
               <button className="reserve-btn" onClick={reserveBed}>
                  Reserve a bed
               </button>
            )}

            {state.loading && (
               <div className="reserve-custom-loader-container">
                  <Loader type="Puff" color="#f7c35e" height={48} width={48} />
                  <p>{state.message}</p>
               </div>
            )}
         </div>
      </div>
   );
}

export default Reserve;

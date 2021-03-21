/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react';
import './Reserve.css';
import API from '../utils/API';
import auth from '../auth/auth';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import firebase from '../utils/firebase';
import 'firebase/storage';
import { useStateValue } from '../state/StateProvider';
import { useLocation } from 'react-router-dom';
const QRCode = require('qrcode.react');
const storage = firebase.storage();

function Reserve() {
   const { id } = useParams();
   const history = useHistory();
   const [{ status }, dispatch] = useStateValue();
   const location = useLocation();
   const isReservation = location.pathname.startsWith('/reservation/');

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
   const [reservation, setReservation] = useState({});
   const [disabled, setDisabled] = useState(false);

   useEffect(() => {
      async function fetchHospitalInfo() {
         try {
            setState((prevState) => ({
               ...prevState,
               loading: true,
               message: 'Refreshing data',
            }));
            const res = await API.get(`/hospital/${id}`, {
               headers: { 'auth-token': auth.getToken() },
            });

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
         } catch (err) {
            setState((prevState) => ({ ...prevState, loading: false }));
            console.log(err);
         }
      }

      async function fetchReservation() {
         try {
            setState((prevState) => ({
               ...prevState,
               loading: true,
               message: 'Fetching Reservation',
            }));
            const res = await API.get(`/booking/${id}`, {
               headers: { 'auth-token': auth.getToken() },
            });

            setReservation(res.data?.data);
            console.log(res.data?.data);

            setState((prevState) => ({ ...prevState, loading: false }));

            dispatch({
               type: 'SET_SELECTED_HOSPITAL',
               selectedHospital: res.data?.data?.hospitalId?.name,
            });

            dispatch({
               type: 'SET_SELECTED_HOSPITAL_ID',
               selectedHospitalId: res.data?.data?.hospitalId?._id,
            });
         } catch (err) {
            setState((prevState) => ({ ...prevState, loading: false }));
            console.log(err);
         }
      }

      if (isReservation) {
         fetchReservation();
      } else fetchHospitalInfo();

      dispatch({
         type: 'SET_SIDEBAR',
         sidebar: isReservation ? 'RESERVATION' : 'RESERVE',
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
                     API.post('/booking/reserve', data, {
                        headers: { 'auth-token': auth.getToken() },
                     }).then((res) => {
                        setState((prevState) => ({
                           ...prevState,
                           loading: false,
                        }));
                        console.log(res.data);
                        const booking = res.data?.booking;
                        setTimeout(
                           () => history.replace(`/reservation/${booking._id}`),
                           2000
                        );
                     });
                  } catch (err) {
                     setState((prevState) => ({
                        ...prevState,
                        loading: false,
                     }));
                     console.log(err);
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

      handleImage(file);
   }

   async function acceptBed() {
      try {
         const res = await API.post(
            '/booking/update',
            {
               isAccepted: 1,
               bookingId: id,
            },
            {
               headers: { 'auth-token': auth.getToken() },
            }
         );
         if (res.data?.status) {
            alert('Updated');
         } else alert('Error');
      } catch (err) {
         console.log(err);
      }
   }

   async function rejectBed() {
      try {
         const res = await API.post(
            '/booking/update',
            {
               isAccepted: 2,
               bookingId: id,
            },
            {
               headers: { 'auth-token': auth.getToken() },
            }
         );
         if (res.data?.status) {
            alert('Updated');
         } else alert('Error');
      } catch (err) {
         console.log(err);
      }
   }

   return (
      <div className="section reserve">
         <div className="reserve-form">
            <h1>{isReservation ? 'Reservation Details' : 'Reserve a bed'}</h1>
            <div className="reserve-details">
               <div className="reserve-container">
                  <h3 className="reserve-detail-header">Name*</h3>
                  <div className="reserve-detail-body">
                     <input
                        type="text"
                        name="name"
                        value={isReservation ? reservation?.name : state.name}
                        onChange={isReservation ? undefined : handleState}
                        disabled={isReservation}
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
                        value={isReservation ? reservation?.age : state.age}
                        onChange={isReservation ? undefined : handleState}
                        disabled={isReservation}
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
                        value={
                           isReservation
                              ? reservation?.aadharCard
                              : state.aadhaar
                        }
                        onChange={isReservation ? undefined : handleState}
                        disabled={isReservation}
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
                        value={isReservation ? reservation.type : state.type}
                        onChange={isReservation ? undefined : handleState}
                        disabled={isReservation}>
                        <option value="0">Normal Bed</option>
                        <option value="1">ICU without ventilator</option>
                        <option value="2">ICU with ventilator</option>
                     </select>
                  </div>
               </div>

               <div className="reserve-container">
                  <h3 className="reserve-detail-header">COVID Report</h3>
                  <div className="reserve-detail-body">
                     {isReservation ? (
                        <a
                           className="link"
                           href={reservation?.pdfLink || '#'}
                           target="_blank"
                           rel="noreferrer">
                           <button>View Report</button>
                        </a>
                     ) : (
                        <input
                           type="file"
                           onChange={(e) => setFile(e.target.files[0])}
                           accept=".pdf"
                        />
                     )}
                  </div>
               </div>
               <div className="reserve-container">
                  <h3 className="reserve-detail-header">COVID Trace*</h3>
                  <div className="reserve-detail-body">
                     <select
                        className="reserve-select"
                        name="covidTrace"
                        value={
                           isReservation
                              ? reservation?.covidTrace
                              : state.covidTrace
                        }
                        onChange={isReservation ? undefined : handleState}
                        disabled={isReservation}>
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

            <div className="reserve-actions">
               {!disabled && !isReservation && (
                  <button className="reserve-btn" onClick={reserveBed}>
                     Reserve a bed
                  </button>
               )}

               {status === 1 && isReservation && reservation?.isAccepted === 0 && (
                  <button className="accept-btn" onClick={acceptBed}>
                     Accept
                  </button>
               )}

               {status === 1 && isReservation && reservation?.isAccepted === 0 && (
                  <button className="reject-btn" onClick={rejectBed}>
                     Reject
                  </button>
               )}
            </div>

            {reservation?.isAccepted === 0 && (
               <h1 className="reserve-status">
                  Awaiting Confirmation from the hospital
               </h1>
            )}

            {reservation?.isAccepted === 1 && reservation?.isActive === 0 && (
               <div className="reserve-qr-code">
                  <QRCode value={reservation._id} />
                  <p>Please go to the hospital to confirm your reservation.</p>
               </div>
            )}

            {reservation?.isAccepted === 1 && reservation?.isActive === 1 && (
               <h1 className="reserve-status">Room Allocated</h1>
            )}

            {reservation?.isAccepted === 2 && (
               <h1 className="reserve-status">
                  Reservation declined by the hospital
               </h1>
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

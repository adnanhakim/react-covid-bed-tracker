import React, { useState, useEffect } from 'react';
import './Reserve.css';
import API from '../utils/API';
import { useParams } from 'react-router';
import Loader from 'react-loader-spinner';
import { useStateValue } from '../state/StateProvider';

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

   useEffect(() => {
      async function fetchHospitalInfo() {
         try {
            setState((prevState) => ({
               ...prevState,
               loading: true,
               message: 'Refreshing data',
            }));
            const res = await API.get(`/hospital/${id}`);

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

   function handleState(e) {
      setState({ ...state, [e.target.name]: e.target.value });
   }

   async function reserveBed() {
      try {
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

         let formData = new FormData();
         formData.append('name', state.name);
         formData.append('age', state.age);
         formData.append('aadhaarCard', state.aadhaar);
         formData.append('type', state.type);
         formData.append('covidTrace', state.covidTrace);
         formData.append('pdf', file);

         const res = await API.post('/booking/reserve', formData, {
            headers: {
               'Content-Type': 'multipart/form-data',
            },
         });

         setState((prevState) => ({ ...prevState, loading: false }));
         console.log(res.data);
      } catch (err) {
         setState((prevState) => ({ ...prevState, loading: false }));
         console.log(err);
      }
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
            <button className="reserve-btn" onClick={reserveBed}>
               Reserve a bed
            </button>

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

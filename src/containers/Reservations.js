import React, { useState, useEffect } from 'react';
import './Reservations.css';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../state/StateProvider';
import ReservationCard from '../components/reservation/ReservationCard';

function Reservations() {
   const history = useHistory();
   const [{ status }, dispatch] = useStateValue();

   const [loading, setLoading] = useState(false);

   useEffect(() => {
      // async function fetchHospitals() {
      //    try {
      //       const res = await API.get('/hospital/all');
      //       setLoading(false);
      //       setHospitals(res.data?.data);
      //    } catch (err) {
      //       setLoading(false);
      //       console.log(err);
      //    }
      // }

      // fetchHospitals();

      dispatch({
         type: 'SET_SIDEBAR',
         sidebar: 'RESERVATIONS',
      });
   }, [dispatch]);

   useEffect(() => {
      if (status === 0) {
         history.replace('/');
      }
   }, [status, history]);

   return (
      <div className="section">
         <div className="reservations">
            <h3>Reservations</h3>
            <div className="reservation-list">
               <ReservationCard />
               <ReservationCard />
               <ReservationCard />
               <ReservationCard />
               <ReservationCard />
            </div>
         </div>
      </div>
   );
}

export default Reservations;

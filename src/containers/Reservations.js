import React, { useState, useEffect } from 'react';
import './Reservations.css';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../state/StateProvider';
import ReservationCard from '../components/reservation/ReservationCard';
import API from '../utils/API';

function Reservations() {
   const history = useHistory();
   const [{ status }, dispatch] = useStateValue();

   const [loading, setLoading] = useState(false);
   const [reservations, setReservations] = useState([]);

   useEffect(() => {
      async function fetchReservations() {
         try {
            const res = await API.get('/booking/all');
            setLoading(false);
            console.log(res.data?.data);
            setReservations(res.data?.data);
         } catch (err) {
            setLoading(false);
            console.log(err);
         }
      }

      fetchReservations();

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
               {reservations.map((reservation) => (
                  <ReservationCard
                     key={reservation._id}
                     id={reservation._id}
                     name={reservation.name}
                     trace={reservation.covidTrace}
                     age={reservation.age}
                  />
               ))}
            </div>
         </div>
      </div>
   );
}

export default Reservations;
import React, { useState, useEffect } from 'react';
import './Reservations.css';
import { useStateValue } from '../state/StateProvider';
import ReservationCard from '../components/reservation/ReservationCard';
import API from '../utils/API';
import auth from '../auth/auth';
import CustomLoader from '../components/CustomLoader';

function Reservations() {
   const [{ status }, dispatch] = useStateValue();

   const [loading, setLoading] = useState(true);
   const [reservations, setReservations] = useState([]);

   useEffect(() => {
      async function fetchReservations() {
         try {
            const res = await API.get(
               status === 1 ? '/booking/all' : '/booking/userBookings',
               {
                  headers: { 'auth-token': auth.getToken() },
               }
            );
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
         sidebar: status === 1 ? 'RESERVATIONS' : 'APPLIED',
      });
   }, [dispatch, status]);

   return loading ? (
      <CustomLoader text="Fetching Reservations" />
   ) : (
      <div className="section">
         <div className="reservations">
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

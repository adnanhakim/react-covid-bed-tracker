import React from 'react';
import './ReservationCard.css';
import { Link } from 'react-router-dom';

function ReservationCard({ id }) {
   function getPatientTrace(trace) {
      if (!trace) {
         return '';
      } else if (trace === 0) {
         return 'No known COVID traces';
      } else if (trace === 1) {
         return 'Patient has travelled from a country with COVID alert';
      } else if (trace === 2) {
         return 'Patient has been in contact with another COVID patient';
      } else {
         return 'Invalid data';
      }
   }

   return (
      <Link to={`/reservation/${id}`} className="link">
         <div className="reservation-card-container">
            <div className="reservation-card">
               <div className="reservation-card-left">
                  <h3>John Doe</h3>
                  <p>{getPatientTrace(1)}</p>
               </div>
               <div className="reservation-card-right">
                  <h3>30 </h3>
                  <p>years old</p>
               </div>
            </div>
         </div>
      </Link>
   );
}

export default ReservationCard;

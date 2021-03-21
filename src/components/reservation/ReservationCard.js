import React from 'react';
import './ReservationCard.css';
import { Link } from 'react-router-dom';

function ReservationCard({ id, name, trace, age }) {
   function getPatientTrace(trace) {
      if (trace === undefined) {
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
                  <h3>{name}</h3>
                  <p>{getPatientTrace(trace)}</p>
               </div>
               <div className="reservation-card-right">
                  <h3>{age} </h3>
                  <p>years old</p>
               </div>
            </div>
         </div>
      </Link>
   );
}

export default ReservationCard;

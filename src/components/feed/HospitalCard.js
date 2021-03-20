import React from 'react';
import './HospitalCard.css';
import { Link } from 'react-router-dom';

function HospitalCard({ id, name, city, freeBeds, totalBeds }) {
   return (
      <Link to={`/hospital/${id}`} className="link">
         <div className="hospital-card-container">
            <div className="hospital-card">
               <div className="hospital-card-left">
                  <h3>{name}</h3>
                  <p>{city}</p>
               </div>
               <div className="hospital-card-right">
                  <h3>{`${freeBeds}/${totalBeds}`} </h3>
                  <p>beds available</p>
               </div>
            </div>
         </div>
      </Link>
   );
}

export default HospitalCard;

import React from 'react';
import './HospitalCard.css';
import { Link } from 'react-router-dom';

function HospitalCard() {
   return (
      <Link to={`/application/`} className="link">
         <div className="hospital-card-container">
            <div className="hospital-card">
               <div className="hospital-card-left">
                  <h3>Kasturba</h3>
                  <p>Mumbai</p>
               </div>
               <div className="hospital-card-right">
                  <h3>12/20 </h3>
                  <p>beds available</p>
               </div>
            </div>
         </div>
      </Link>
   );
}

export default HospitalCard;

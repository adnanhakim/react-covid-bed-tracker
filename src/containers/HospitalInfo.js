import React, { useState, useEffect } from 'react';
import './HospitalInfo.css';
import API from '../utils/API';
import auth from '../auth/auth';
import { Link, useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import CustomLoader from '../components/CustomLoader';
import { useStateValue } from '../state/StateProvider';

function HospitalInfo() {
   const history = useHistory();
   const { id } = useParams();
   const [{ status }, dispatch] = useStateValue();

   const [loading, setLoading] = useState(true);
   const [hospital, setHospital] = useState({});

   useEffect(() => {
      async function fetchHospitalInfo() {
         try {
            const res = await API.get(`/hospital/${id}`, {
               headers: { 'auth-token': auth.getToken() },
            });

            setLoading(false);
            setHospital(res.data?.data);
         } catch (err) {
            setLoading(false);
            if (err.response?.status === 404) {
               console.log(err.response.data);
               history.replace(`/`);
            } else console.log(err);
         }
      }

      fetchHospitalInfo();
   }, [id, history]);

   useEffect(() => {
      dispatch({
         type: 'SET_SIDEBAR',
         sidebar: 'HOSPITAL_INFO',
      });

      dispatch({
         type: 'SET_SELECTED_HOSPITAL',
         selectedHospital: hospital?.name,
      });
   }, [dispatch, hospital?.name]);

   return loading ? (
      <CustomLoader text="Fetching Hospital Details" />
   ) : (
      <div className="section">
         <div className="hospital-info">
            <div className="hospital-info-card">
               <h3>{hospital?.name}</h3>
               <h4>{hospital?.city}</h4>

               <div className="hospital-info-beds">
                  <div className="hospital-info-bed-card">
                     <p>Normal Beds</p>
                     <h3>{`${hospital.freenormalbeds}/${hospital.totalnormalbeds}`}</h3>
                  </div>
                  <div className="hospital-info-bed-card">
                     <p>ICU Beds without ventilators</p>
                     <h3>{`${hospital.freeicuwithoutbeds}/${hospital.totalicuwithoutbeds}`}</h3>
                  </div>
                  <div className="hospital-info-bed-card">
                     <p>ICU Beds with ventilators</p>
                     <h3>{`${hospital.freeicubeds}/${hospital.totalicubeds}`}</h3>
                  </div>
               </div>
            </div>

            <div className="hospital-info-card">
               <p>{hospital?.address}</p>
               <div className="hospital-info-btns">
                  <button className="hospital-info-btn">
                     <a
                        className="link"
                        href={`https://www.google.com/maps/search/?api=1&query=${hospital?.latt},${hospital?.long}`}
                        target="_blank"
                        rel="noreferrer">
                        Locate on Google Maps
                     </a>
                  </button>
                  {status === 0 && (
                     <button className="hospital-info-btn">
                        <Link to={`/hospital/${id}/reserve`} className="link">
                           Reserve a bed
                        </Link>
                     </button>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
}

export default HospitalInfo;

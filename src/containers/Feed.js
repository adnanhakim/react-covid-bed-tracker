import React, { useState, useEffect } from 'react';
import HospitalCard from '../components/feed/HospitalCard';
import CustomLoader from '../components/CustomLoader';
import './Feed.css';
import { useStateValue } from '../state/StateProvider';
import API from '../utils/API';
import auth from '../auth/auth';

function Feed() {
   const [{ query }, dispatch] = useStateValue();

   const [hospitals, setHospitals] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      async function fetchHospitals() {
         try {
            const res = await API.get('/hospital/all', {
               headers: { 'auth-token': auth.getToken() },
            });
            setLoading(false);
            setHospitals(res.data?.data);
         } catch (err) {
            setLoading(false);
            console.log(err);
         }
      }

      fetchHospitals();

      dispatch({
         type: 'SET_SIDEBAR',
         sidebar: 'HOSPITALS',
      });
   }, [dispatch]);

   return loading ? (
      <CustomLoader text="Fetching Hospitals" />
   ) : (
      <div className="section">
         <div className="feed-hospitals">
            {hospitals
               .filter((hospital) =>
                  hospital.name.toLowerCase().includes(query.toLowerCase())
               )
               .map((hospital) => (
                  <HospitalCard
                     key={hospital._id}
                     id={hospital._id}
                     name={hospital.name}
                     city={hospital.city}
                     freeBeds={hospital.freeBeds}
                     totalBeds={hospital.totalBeds}
                  />
               ))}
         </div>
      </div>
   );
}

export default Feed;

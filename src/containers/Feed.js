import React, { useState, useEffect } from 'react';
import HospitalCard from '../components/feed/HospitalCard';
import './Feed.css';
import { useStateValue } from '../state/StateProvider';

function Feed() {
   const [, dispatch] = useStateValue();

   useEffect(() => {
      // async function fetchJobs() {
      //    try {
      //       const res = await axios({
      //          method: 'GET',
      //          url: applied
      //             ? `${BASE_URL}/company/applied`
      //             : `${BASE_URL}/company/`,
      //          headers: {
      //             'auth-token': auth.getToken(),
      //          },
      //       });

      //       setLoading(false);
      //       dispatch({
      //          type: 'SET_JOBS',
      //          jobs: res.data,
      //       });
      //    } catch (err) {
      //       setLoading(false);
      //       console.log(err);
      //    }
      // }

      // fetchJobs();

      dispatch({
         type: 'SET_SIDEBAR',
         sidebar: 'HOSPITALS',
      });
   }, [dispatch]);

   return (
      <div className="section">
         <div className="feed-hospitals">
            <HospitalCard />
            <HospitalCard />
            <HospitalCard />
            <HospitalCard />
            <HospitalCard />
         </div>
      </div>
   );
}

export default Feed;

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './Overview.css';
import { useStateValue } from '../state/StateProvider';

function Overview() {
   const [, dispatch] = useStateValue();
   const [statsLatest, setStatsLatest] = useState({
      active: 0,
      recovered: 0,
      deaths: 0,
   });
   const [totalTested, setTotalTested] = useState(0);
   const [hospitalBeds, setHospitalBeds] = useState({
      totalHospitals: 0,
      totalBeds: 0,
   });

   useEffect(() => {
      async function fetchStatsLatest() {
         try {
            const res = await axios.get(
               'https://api.rootnet.in/covid19-in/stats/latest'
            );
            const data = res.data?.data['unofficial-summary'][0];
            setStatsLatest({
               active: data.active,
               recovered: data.recovered,
               deaths: data.deaths,
            });
         } catch (err) {
            console.log(err);
         }
      }

      async function fetchTestingLatest() {
         try {
            const res = await axios.get(
               'https://api.rootnet.in/covid19-in/stats/testing/latest'
            );
            setTotalTested(res.data?.data.totalSamplesTested);
         } catch (err) {
            console.log(err);
         }
      }

      async function fetchHospitalBeds() {
         try {
            const res = await axios.get(
               'https://api.rootnet.in/covid19-in/hospitals/beds'
            );
            const data = res.data?.data.summary;
            setHospitalBeds({
               totalHospitals: data.totalHospitals,
               totalBeds: data.totalBeds,
            });
         } catch (err) {
            console.log(err);
         }
      }

      fetchStatsLatest();
      fetchTestingLatest();
      fetchHospitalBeds();

      dispatch({
         type: 'SET_SIDEBAR',
         sidebar: 'OVERVIEW',
      });
   }, [dispatch]);

   return (
      <div className="section overview-container">
         <div className="overview">
            <div className="row">
               <div className="smaller-section">
                  <div className="small-card active">
                     <p>Active</p>
                     <h3>{statsLatest.active}</h3>
                  </div>
                  <div className="small-card recovered">
                     <p>Recovered</p>
                     <h3>{statsLatest.recovered}</h3>
                  </div>
                  <div className="small-card deaths">
                     <p>Deaths</p>
                     <h3>{statsLatest.deaths}</h3>
                  </div>
               </div>
               <div className="bigger-section">jj</div>
            </div>
            <div className="row">
               <div className="bigger-section">jj</div>
               <div className="smaller-section">
                  <div className="small-card tested">
                     <p>Tested</p>
                     <h3>{totalTested}</h3>
                  </div>
                  <div className="small-card hospitals">
                     <p>Hospitals</p>
                     <h3>{hospitalBeds.totalHospitals}</h3>
                  </div>
                  <div className="small-card beds">
                     <p>Beds</p>
                     <h3>{hospitalBeds.totalBeds}</h3>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Overview;

import React from 'react';
import './Dashboard.css';
import { Switch, Route } from 'react-router-dom';
import Feed from './Feed';
import Sidebar from '../components/Sidebar';
import Request from './Request';
import Navbar from '../components/Navbar';
import HospitalInfo from './HospitalInfo';
import Reserve from './Reserve';
import Reservations from './Reservations';

function Dashboard() {
   return (
      <div className="dashboard">
         <Sidebar />
         <div className="container">
            <Navbar />
            <section className="main">
               <Switch>
                  <Route
                     path="/hospital/:id/reserve"
                     exact
                     component={Reserve}
                  />
                  <Route path="/reservations" exact component={Reservations} />
                  <Route path="/sendRequest" exact component={Request} />
                  <Route path="/hospital/:id" exact component={HospitalInfo} />
                  <Route path="/" component={Feed} />
               </Switch>
            </section>
         </div>
      </div>
   );
}

export default Dashboard;

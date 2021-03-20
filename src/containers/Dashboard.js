import React from 'react';
import './Dashboard.css';
import { Switch, Route } from 'react-router-dom';
import Feed from './Feed';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

function Dashboard() {
   return (
      <div className="dashboard">
         <Sidebar />
         <div className="container">
            <Navbar />
            <section className="main">
               <Switch>
                  <Route path="/" component={Feed} />
               </Switch>
            </section>
         </div>
      </div>
   );
}

export default Dashboard;

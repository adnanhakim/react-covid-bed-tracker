import React, { useState } from 'react';
import './Navbar.css';
import SearchIcon from '@material-ui/icons/Search';
import { Link, useHistory } from 'react-router-dom';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import { useStateValue } from '../state/StateProvider';
import auth from '../auth/auth';

function Navbar() {
   const history = useHistory();
   const [
      {
         sidebar,
         query,
         active,
         selectedHospital,
         selectedHospitalId,
         username,
      },
      dispatch,
   ] = useStateValue();

   const [dropdown, setDropdown] = useState(false);

   function logout() {
      auth.logout(() => history.replace('/login'));
   }

   function handleSidebar() {
      if (active) {
         dispatch({
            type: 'SET_ACTIVE',
            active: false,
         });
      } else {
         dispatch({
            type: 'SET_ACTIVE',
            active: true,
         });
      }
   }

   function handleQuery(e) {
      dispatch({
         type: 'SET_QUERY',
         query: e.target.value,
      });
   }

   return (
      <header className="navbar">
         <div className="navbar-left">
            {active && (
               <MenuOpenIcon
                  className="navbar-hamburger"
                  onClick={handleSidebar}
               />
            )}

            {sidebar === 'HOSPITALS' && (
               <div className="navbar-search">
                  <SearchIcon className="navbar-search-icon" />
                  <input
                     type="text"
                     value={query}
                     onChange={handleQuery}
                     placeholder="Search for hospitals"
                  />
               </div>
            )}

            {sidebar === 'HOSPITAL_INFO' && (
               <div className="navbar-breadcrumb">
                  <Link className="link" to="/">
                     Hospitals
                  </Link>{' '}
                  &nbsp;&gt;&nbsp; {selectedHospital}
               </div>
            )}

            {sidebar === 'RESERVE' && (
               <div className="navbar-breadcrumb">
                  <Link className="link" to="/">
                     Hospitals
                  </Link>{' '}
                  &nbsp;&gt;&nbsp;{' '}
                  <Link className="link" to={`/hospital/${selectedHospitalId}`}>
                     {selectedHospital}
                  </Link>{' '}
                  &nbsp;&gt;&nbsp; Reserve a bed
               </div>
            )}

            {sidebar === 'OVERVIEW' && (
               <div className="navbar-breadcrumb">Overview</div>
            )}

            {sidebar === 'CHATBOT' && (
               <div className="navbar-breadcrumb">Chatbot</div>
            )}

            {sidebar === 'RESERVATION' && (
               <div className="navbar-breadcrumb">
                  <Link className="link" to={`/hospital/${selectedHospitalId}`}>
                     {selectedHospital}
                  </Link>{' '}
                  &nbsp;&gt;&nbsp; Reservation Details
               </div>
            )}

            {sidebar === 'RESERVATIONS' && (
               <div className="navbar-breadcrumb">Reservations</div>
            )}

            {sidebar === 'APPLIED' && (
               <div className="navbar-breadcrumb">My Reservations</div>
            )}
         </div>
         <div className="navbar-right">
            <div className="navbar-tag">{username}</div>

            <div className="navbar-dropdown-container">
               {dropdown === false ? (
                  <ArrowDropDownIcon
                     className="navbar-dropdown-button"
                     onClick={() => setDropdown(!dropdown)}
                  />
               ) : (
                  <ArrowDropUpIcon
                     className="navbar-dropdown-button"
                     onClick={() => setDropdown(!dropdown)}
                  />
               )}
               {dropdown && (
                  <div className="navbar-dropdown">
                     <button
                        className="navbar-dropdown-option link logout-btn"
                        onClick={logout}>
                        Logout
                     </button>
                  </div>
               )}
            </div>
         </div>
      </header>
   );
}

export default Navbar;

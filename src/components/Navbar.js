import React, { useState, useEffect } from 'react';
import './Navbar.css';
import SearchIcon from '@material-ui/icons/Search';
import { Link, useHistory } from 'react-router-dom';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import { useStateValue } from '../state/StateProvider';
import auth from '../auth/auth';

function Navbar() {
   const history = useHistory();
   const [{ sidebar, query, active }, dispatch] = useStateValue();

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

            {sidebar === 'OVERVIEW' && (
               <div className="navbar-breadcrumb">Overview</div>
            )}
            {sidebar === 'PROFILE' && (
               <div className="navbar-breadcrumb">Profile</div>
            )}
            {sidebar === 'CREATE' && (
               <div className="navbar-breadcrumb">Add a New Job</div>
            )}
         </div>
         <div className="navbar-right">
            <div className="navbar-tag">Admin</div>

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

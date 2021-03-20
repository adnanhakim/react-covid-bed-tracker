import React from 'react';
import './SidebarOption.css';
import { Link } from 'react-router-dom';

function SidebarOption({ Icon, title, active, link }) {
   return (
      <Link to={link} className="link">
         <div
            className={`sidebar-option ${active && 'sidebar-option--active'}`}>
            <div className="sidebar-option-line"></div>
            <div className="sidebar-option-info">
               <Icon className="sidebar-option-logo" />
               <div className="sidebar-option-name">{title}</div>
            </div>
         </div>
      </Link>
   );
}

export default SidebarOption;

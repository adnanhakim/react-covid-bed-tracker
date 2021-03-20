import React from 'react';
import './Sidebar.css';
import SidebarOption from './SidebarOption';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PersonIcon from '@material-ui/icons/Person';
import SendIcon from '@material-ui/icons/Send';
import { useStateValue } from '../state/StateProvider';

function Sidebar() {
   const [{ user, sidebar, active }] = useStateValue();

   return (
      <div className={`sidebar ${active && 'sidebar--active'}`}>
         <h3>COVID Tracker </h3>

         <SidebarOption
            Icon={DashboardIcon}
            title={'Overview'}
            link={'/overview'}
            active={sidebar === 'OVERVIEW'}
            mobileView
         />
         <SidebarOption
            Icon={LocalHospitalIcon}
            title={'Hospitals'}
            link={'/'}
            active={sidebar === 'HOSPITALS'}
            mobileView
         />
         <SidebarOption
            Icon={NotificationsActiveIcon}
            title={'My Applications'}
            link={'/applied'}
            active={sidebar === 'APPLIED'}
            mobileView
         />
         <SidebarOption
            Icon={PersonIcon}
            title={'Profile'}
            link={'/profile'}
            active={sidebar === 'PROFILE'}
            mobileView
         />
         {user?.status >= 1 && (
            <SidebarOption
               Icon={AddCircleIcon}
               title={'Add Job'}
               link={'/application/add'}
               active={sidebar === 'CREATE'}
               mobileView
            />
         )}
         {user?.status >= 1 && (
            <SidebarOption
               Icon={SendIcon}
               title={'Notification'}
               link={'/application/notification'}
               active={sidebar === 'NOTIFICATION'}
               mobileView
            />
         )}
      </div>
   );
}

export default Sidebar;

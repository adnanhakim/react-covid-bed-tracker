import React from 'react';
import './Sidebar.css';
import SidebarOption from './SidebarOption';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import AssistantIcon from '@material-ui/icons/Assistant';
import HotelIcon from '@material-ui/icons/Hotel';
import { useStateValue } from '../state/StateProvider';

function Sidebar() {
   const [{ status, sidebar, active }] = useStateValue();

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
         {status === 0 && (
            <SidebarOption
               Icon={NotificationsActiveIcon}
               title={'My Reservations'}
               link={'/reservations'}
               active={sidebar === 'APPLIED'}
               mobileView
            />
         )}
         {status === 0 && (
            <SidebarOption
               Icon={AssistantIcon}
               title={'Chatbot'}
               link={'/chatbot'}
               active={sidebar === 'CHATBOT'}
               mobileView
            />
         )}

         {status === 1 && <h3>Admin</h3>}
         {status === 1 && (
            <SidebarOption
               Icon={HotelIcon}
               title={'Reservations'}
               link={'/reservations'}
               active={sidebar === 'RESERVATIONS'}
               mobileView
            />
         )}
      </div>
   );
}

export default Sidebar;

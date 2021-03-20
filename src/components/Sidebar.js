import React from 'react';
import './Sidebar.css';
import SidebarOption from './SidebarOption';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
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
         <SidebarOption
            Icon={NotificationsActiveIcon}
            title={'My Reservations'}
            link={'/applied'}
            active={sidebar === 'APPLIED'}
            mobileView
         />
         <h3>Admin</h3>
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

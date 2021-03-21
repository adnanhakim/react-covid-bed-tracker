import React, { useEffect } from 'react';
import './App.css';
import Dashboard from './containers/Dashboard';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './containers/Login';
import ProtectedRoute from './auth/ProtectedRoute';
import auth from './auth/auth';
import AdminLogin from './containers/AdminLogin';
import { useStateValue } from './state/StateProvider';
import API from './utils/API';

function App() {
   const [{ reload }, dispatch] = useStateValue();

   useEffect(() => {
      console.log('hi');

      async function fetchUser() {
         try {
            const res = await API.get('/user', {
               headers: { 'auth-token': auth.getToken() },
            });
            console.log(res.data);

            dispatch({
               type: 'SET_USERNAME',
               username: res.data?.username,
            });

            dispatch({
               type: 'SET_STATUS',
               status: res.data?.type,
            });
         } catch (err) {
            console.log(err);
         }
      }

      fetchUser();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [dispatch, reload]);

   return (
      <Router>
         <div className="App">
            <Switch>
               <Route path="/admin/login" exact component={AdminLogin} />
               <Route path="/login" exact component={Login} />
               <ProtectedRoute path="/" component={Dashboard} />
            </Switch>
         </div>
      </Router>
   );
}

export default App;

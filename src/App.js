import './App.css';
import Dashboard from './containers/Dashboard';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './containers/Login';
import ProtectedRoute from './auth/ProtectedRoute';
import AdminLogin from './containers/AdminLogin';

function App() {
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

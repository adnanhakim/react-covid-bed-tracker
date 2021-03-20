import './App.css';
import Dashboard from './containers/Dashboard';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './containers/Login';
import ProtectedRoute from './auth/ProtectedRoute';

function App() {
   return (
      <Router>
         <div className="App">
            <Switch>
               <Route path="/login" exact component={Login} />
               <ProtectedRoute path="/" component={Dashboard} />
            </Switch>
         </div>
      </Router>
   );
}

export default App;

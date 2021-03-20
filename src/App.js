import './App.css';
import Dashboard from './containers/Dashboard';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
   return (
      <Router>
         <div className="App">
            <Switch>
               {/* <Route path="/login" exact component={Login} /> */}
               <Route path="/" component={Dashboard} />
            </Switch>
         </div>
      </Router>
   );
}

export default App;

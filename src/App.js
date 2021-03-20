import './App.css';
import { useStateValue } from './state/StateProvider';

function App() {
   const [{ sidebar }, dispatch] = useStateValue();

   return (
      <div className="App">
         <h1>{sidebar}</h1>
      </div>
   );
}

export default App;

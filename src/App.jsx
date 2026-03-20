import { Barplot } from "./components/BarChart";
import { data } from "./data";
import './App.css';

function App() { //creating an app that creates a div which calls our Barplot component and uses the data
  return (
    <div className="App">
      <h1>Simple Barplot Exercise</h1>
      <p>Number of students per country</p>
      <Barplot data={data} /> 
    </div>
  );
}

export default App

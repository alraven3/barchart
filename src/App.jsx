import { Barplot } from "./components/BarChart";
import { data } from "./data";
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Simple Barplot Exercise</h1>
      <p>Number of students per country</p>
      <Barplot data={data} />
    </div>
  );
}

export default App

import logo from './logo.svg';
import './App.css';
import MyResponsiveWaffleCanvas from './Sunburst';
import BarChart from './HeatMap1';
import Data from "./data1.json"

function App() {
  return (
    <div className="App">
      {/* <MyResponsiveWaffleCanvas data={data}/> */}
      <BarChart data={Data.data}/>
    </div>
  );
}

export default App;

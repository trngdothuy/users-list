import './App.css';
import React, {useEffect, useState} from 'react';
import { fetchData } from './api';

function App() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetchData().then(setData);
  }, []);
  
  return (
    <div className="App">
      <h1 className="">Data from Backend</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

"use client";

import  React,  { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';


export default function Home() {

const [city, setCity] = useState('');
const [data, setData] = useState([]);


const convertKelvinToCelsius = (kelvin) => {
  return (kelvin - 273.15).toFixed(2);
};



const handleClick = (event) => {
  if (event.key === 'Enter') {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ec1c08fdbd8c0694bf55fb529d582507`)
      .then(response => response.json())
      .then(data => {
          setData(data); 
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
};








  return(
    <div style={{
      display: 'flex',
      alignItems: 'center',
      height: '100vh',
      flexDirection: 'column',
      paddingTop: '20px',
    }}>
      <div style={{display: 'flex',alignItems:"center"}}>
        <TextField id="outlined-basic" label="Search" value={city} variant="outlined" onChange={(e) => setCity(e.target.value) } onKeyDown={handleClick} />
        <SearchIcon fontSize="large"  />
      </div>

      <div style={{display:'flex', flexDirection:'column' }}>
        
        <div style={{padding:"15px"}}>
        {data ? (
          <div style={{background: "linear-gradient(to right,rgba(99, 99, 99, 0.35),rgba(94, 94, 94, 0.35),rgb(97, 97, 97, 0.35),rgb(88, 88, 88, 0.35))", borderBlockStyle: "none", borderRadius:"10px", padding:"5px"}}>
            <h1>Weather Info for {data.name}</h1>
            <h3>Temperature: {data.main ? convertKelvinToCelsius(data.main.temp) : 'N/A'}°C</h3>
            <h4>Feels like: {data.main ? convertKelvinToCelsius(data.main.feels_like) : 'N/A'}°C</h4>
            <h3>Weather: {data.weather && data.weather[0] ? data.weather[0].description : 'N/A'}</h3>
            <p></p>
          </div>
        ): (
          <p>Loading data...</p>
        )}
          
        </div>
      </div>
      
    </div>
  )
}

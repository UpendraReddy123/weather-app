import React, { useEffect, useState } from 'react'
import './style.css';
import WeatherCard from './WeatherCard';

const WeatherInfo = () => {
  const [searchValue , setSearchValue] = useState("Hyderabad");
  const [tempInfo ,setTempInfo] = useState({});

  const getWeatherInfo= async ()=>{
    try{
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=91764e183afb689f03626727876288b3`

      const res = await fetch(url);
      const data = await res.json();

      const {temp , humidity , pressure} = data.main;
      const {main:weathermood} = data.weather[0];
      const {name} = data;
      const {speed} = data.wind;
      const {country , sunset} = data.sys;
      
      const myWeatherNewInfo = {
        temp,
        humidity,
         pressure,
         weathermood,
         name, 
         speed,
         country,
         sunset
      }

      setTempInfo(myWeatherNewInfo);
    }catch(error){
      console.log(error);
    }
  };

  useEffect(()=>{
    getWeatherInfo();
  } , []);


  return (
    <>

       <div className='wrap'>
           <div className='search'>
               <input className='searchTerm' id='seacrch' placeholder='search....' 
                type='search' autoFocus value={searchValue} onChange={(e)=>setSearchValue(e.target.value)}/>
                <button className='searchButton' type='button' onClick={getWeatherInfo}>search</button>
           </div>
       </div>

      <WeatherCard tempInfo={tempInfo}/>
      
    </>
  )
}

export default WeatherInfo;

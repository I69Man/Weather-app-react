import React, { useState } from "react";
import axios from "axios";

function App() {
  // weather
  const [data,setData] = useState({})
  // query
  const [location,setLocation] = useState('')

  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=c7bdde1c355d2276d02ffbe070246096`

  const searchLocation = (event) =>{
    if(event.key === "Enter"){
      axios.get(url).then((response) =>{
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }
  const dateBuilder = (d) =>{
    let months = ["Jauary", "Febrauary", "March", "April", "May", "June", "July",
     "August", "September", "October", "November", "December"];
     let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "friday",
      "Saturday"];
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()]
      let year = d.getFullYear();
      return `${day} ${date} ${month} ${year}`
  }
  return (
    <div className={
      (typeof data.main != "undefined") ? ((Math.round(data.main.temp/10) > 20) ? 'app' : 'app blue')
      : 'app blue'}>
      <main>
        <div className="search-box">
         <input 
         type="text"
         className="search-bar"
         placeholder="search..."
         onChange={event => setLocation(event.target.value)}
         value={location}
         onKeyPress={searchLocation}
          />
         </div>
         {(typeof data.main != "undefined") ? (  
          <div>
                <div className="location-box">
               <div className="location">{ data.name }, {data.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
              </div>
               <div className="weather-box">
              <div className="temp">{Math.round(data.main.temp/10)}°C</div>
              <div className="weather">{data.weather[0].main}</div>
            </div>
          </div>
          ) :('')}
      </main>
    </div>
  );
}

export default App;

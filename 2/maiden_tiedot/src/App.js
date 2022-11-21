import { useEffect, useState } from 'react'
import axios from 'axios'

const Filter = ({newFilter,handleFilterChange}) => {
  return (
    <div>
      Find countries: 
      <input value={newFilter}
      onChange = {handleFilterChange}
      />
    </div> 
  )  
}

const Countries = ({countriesToshow , weather}) => {
  if (countriesToshow.length > 10) {
    return(
    <div>Too many countries{countriesToshow.length}</div>
    )
  }
  if (countriesToshow.length > 1) {
    return(
      <ul>
        {countriesToshow.map(country =>
        <li key = {country.cca2}>
          {country.name.common} 
        </li>
        )}
      </ul>
    )
  }
  //console.log("w",weather)
  if (countriesToshow.length === 1 && weather)   {
    const country = countriesToshow[0]
    //setCapital(country.capitalInfo)
    
    return(
      <div>
      <h1>{country.name.common}</h1>
      <div>Capital: {country.capital}</div>
      <div>Area: {country.area}</div>
      <h2>Languages:</h2>
      <ul>
        {Object.keys(country.languages).map(countryKey =>
        <li key = {countryKey}>
          {country.languages[countryKey]} 
        </li>
        )}
      </ul>
      <img 
      src={country.flags.png}
      alt={`${country.name.common} flag`}
      />
      <h2>Weather in {country.capital}</h2>
      <div>Temperature: {weather.main.temp} Celcius</div>
      <img 
      src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
      alt={`${weather.weather[0].main}`}
      />
      <div>Wind: {weather.wind.speed} m/s</div>
      </div>
    )
  }
}

function App() {
  const api_key = process.env.REACT_APP_API_KEY
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [weather, setweather] = useState(null)

  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
    })
  },[])
  let capital = []
  const countriesToshow = countries.filter(country => 
    country.name.common.toLowerCase().includes(newFilter.toLowerCase()))
  if (countriesToshow.length === 1){
    capital = countriesToshow[0].capitalInfo.latlng
  }

  useEffect(() => {
    //console.log("eefalku",countriesToshow)
    if (countriesToshow.length === 1) {
    //console.log("eef",countriesToshow)
    const lat = capital[0]
    const lon = capital[1]
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
    .then(response => {
      setweather(response.data)
    })}
  },[newFilter])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  //console.log({countries})
  //console.log({api_key})
  //console.log({weather})
  
  return (
    <div>
      <Filter newFilter = {newFilter} handleFilterChange = {handleFilterChange} />
      <Countries countriesToshow={countriesToshow} weather={weather} />
    </div>
  );
}

export default App;

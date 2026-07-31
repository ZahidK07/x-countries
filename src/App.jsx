import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [countries, setCountries] = useState([])

  useEffect(()=>{
    fetch("https://xcountries-backend.labs.crio.do/all")
    .then((response)=>{
      if(!response.ok){
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      return response.json()
    })
    .then(data => setCountries(data))
    .catch((error) =>{
      console.error("Getting Error for Countries", error)
      // Optional: set an error state to show a message in UI
      setCountries([])
    })
  },[]);


  return (
    <>
      <div className='container'>
        {countries.map((val, i) => (
          <div className="flag-card" key={`${val.abbr || i}-${val.name}`}>
            <div  className="flag">
              <img src={val.flag} alt={val.name} />
              <h4>{val.name}</h4>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App

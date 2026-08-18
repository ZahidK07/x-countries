import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "https://xcountries-backend.labs.crio.do/all";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        return response.json();
      })
      .then((data) => {
        setCountries(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setCountries([]);
      });
  }, []);

  const filteredCountries = countries.filter((country) =>{
    const countryName = String(country?.name || "")
    return countryName.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="app">
      <div className="search-container">
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="search-input"
        />
      </div>

      <div className="countries-container">
        {filteredCountries.map((country, index) => (
          <div
            className="countryCard"
            key={`${country?.name || "country"}-${index}`}
          >
            <img
              src={country?.flag}
              alt={country?.name || "Country flag"}
              className="country-flag"
            />

            <h3>{country?.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(
      "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries",
    )
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
        console.error("Error fetching countries:", error);
      });
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.common.toLowerCase().includes(search.toLowerCase()),
  );

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
        {filteredCountries.map((country) => (
          <div className="countryCard" key={country.common}>
            <img
              src={country.png}
              alt={country.common}
              className="country-flag"
            />
            <h3>{country.common}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

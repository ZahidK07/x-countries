import { useEffect, useState } from "react";
import "./App.css";

const API_URL =
  "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries";

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

  const filteredCountries = countries.filter((country) => {
    const countryName = country?.common || "";

    return countryName.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="app">
      <div className="search-container">
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className="countries-container">
        {filteredCountries.map((country, index) => (
          <div className="countryCard" key={`${country.common}-${index}`}>
            <img src={country.png} alt={country.common} />

            <h2>{country.common}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

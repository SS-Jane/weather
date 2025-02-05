import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faTreeCity, faWind, faDroplet } from "@fortawesome/free-solid-svg-icons";
import { CurrentTime } from "./components/CurrentTimeComponent";
import { useEffect, useState, useCallback } from "react";
import { WeatherIcon } from "./data/WeatherIcon";
import { findClosestCity } from "./utils/citySpellCheck"; // Import spell check utility

function App() {
  const [city, setCity] = useState(null);
  const [tempC, setTempC] = useState(0);
  const [word, setWord] = useState("Bangkok");
  const [searchTerm, setSearchTerm] = useState("Bangkok");
  const [error, setError] = useState(null);
  const [suggestion, setSuggestion] = useState("");

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const getColorClass = (temp) => {
    if (temp < 0) return "text-blue-600";
    if (temp < 10) return "text-blue-400";
    if (temp < 20) return "text-green-500";
    if (temp < 30) return "text-yellow-500";
    if (temp < 40) return "text-orange-500";
    return "text-red-600";
  };

  const convertKToC = (k) => (k - 273).toFixed();

  const getWeatherIcon = (main) => {
    const iconData = WeatherIcon.find(
      (weather) => weather.main.toLowerCase() === main.toLowerCase()
    );
    return iconData ? iconData.img : "";
  };

  const fetchWeather = useCallback((cityName) => {
    const urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    axios
      .get(urlApi)
      .then((response) => {
        const data = response.data;
        setCity(data);
        setTempC(data.main ? convertKToC(data.main.temp) : 0);
        setError(null);
      })
      .catch((err) => {
        console.error("Error fetching weather data:", err);
        setCity(null);
        setTempC(0);
        setError("Could not fetch weather data. Please try again.");
      });
  }, [apiKey]);

  const handleSearch = useCallback(() => {
    const closestCity = findClosestCity(searchTerm.trim());
    if (closestCity && closestCity.toLowerCase() !== searchTerm.trim().toLowerCase()) {
      setSuggestion(closestCity);
    } else {
      setSuggestion("");
      setWord(searchTerm.trim());
    }
  }, [searchTerm]);

  const applySuggestion = () => {
    setSearchTerm(suggestion);
    setWord(suggestion);
    setSuggestion("");
  };

  useEffect(() => {
    if (word.trim()) {
      fetchWeather(word.trim());
    }
  }, [word, fetchWeather]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-cyan-300 to-blue-400">
      <section className="w-1/2">
        <div>
          <label htmlFor="search" className="input input-bordered flex items-center gap-2">
            <FontAwesomeIcon icon={faTreeCity} />
            <input
              id="search"
              type="text"
              className="grow"
              placeholder="Search City"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </label>
        </div>

        {suggestion && (
          <div className="mt-2 text-center">
            <p className="text-gray-700">
              Did you mean{" "}
              <button
                onClick={applySuggestion}
                className="text-blue-500 underline"
              >
                {suggestion}
              </button>
              ?
            </p>
          </div>
        )}

<div className="flex flex-row items-center justify-center my-4">
          {city && city.name ? (
            <>
              <h1 className="text-4xl text-red-500 font-bold mx-1">{city.name}</h1>
              <p className="text-4xl text-black">|</p>
              <h2 className="mx-1 text-4xl text-black font-bold">{city.sys.country}</h2>
            </>
          ) : (
            <p className="text-2xl text-gray-700">Loading...</p>
          )}
        </div>

        {error && <p className="text-red-600 text-center my-4">{error}</p>}

        <div className="flex flex-col items-center justify-center border-0 rounded-xl bg-white bg-opacity-70 pb-4">
          {city && city.main && city.weather ? (
            <>
              <div className="flex flex-row">
                <img
                  src={getWeatherIcon(city.weather[0].main)}
                  alt={`Weather icon showing ${city.weather[0].description}`}
                  loading="lazy"
                  onError={(e) => (e.target.src = "/fallback-icon.png")}
                />
                <p className={`text-4xl mx-2 ${getColorClass(tempC)} flex items-center justify-center`}>
                  {tempC}&deg;C
                </p>
              </div>
              <div className="flex flex-row items-center justify-center">
                <span className="text-orange-500 text-2xl">
                  {convertKToC(city.main.temp_max)}&deg;C
                </span>
                <p className="text-2xl text-black mx-2">|</p>
                <span className="text-sky-500 text-2xl">
                  {convertKToC(city.main.temp_min)}&deg;C
                </span>
              </div>
            </>
          ) : (
            <p className="text-2xl text-gray-700">Loading...</p>
          )}
        </div>

        <div className="flex flex-row items-center justify-center my-4">
          {city && city.main ? (
            <div className="basis-1/2 border-0 rounded-2xl bg-white opacity-70 p-2 text-center mr-2">
              <FontAwesomeIcon icon={faDroplet} className="mx-2" />
              <span>{city.main.humidity}%</span>
            </div>
          ) : (
            <p className="text-2xl text-gray-700">Loading...</p>
          )}
          {city && city.wind ? (
            <div className="basis-1/2 border-0 rounded-2xl bg-white opacity-70 p-2 text-center ml-2">
              <FontAwesomeIcon icon={faWind} className="mx-2" />
              <span>{city.wind.speed}m/s</span>
            </div>
          ) : (
            <p className="text-2xl text-gray-700">Loading...</p>
          )}
        </div>

        <CurrentTime />
        
      </section>
    </main>
  );
}

export default App;

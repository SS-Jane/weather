import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faTreeCity,
  faWind,
  faDroplet,
} from "@fortawesome/free-solid-svg-icons";
import { CurrentTime } from "./components/CurrentTimeComponent";
import { useEffect, useState } from "react";
import { WeatherIcon } from "./data/WeatherIcon";

function App() {
  const [city, setCity] = useState(null);
  const [tempC, setTempC] = useState(0);
  const [word, setWord] = useState("Bangkok");
  const [searchTerm, setSearchTerm] = useState('Bangkok')


  const getColorClass = (temp) => {
    if (temp < 0) return "text-blue-600";
    if (temp < 10) return "text-blue-400";
    if (temp < 20) return "text-green-500";
    if (temp < 30) return "text-yellow-500";
    if (temp < 40) return "text-orange-500";
    return "text-red-600";
  };

  const apiKey = "25d3a3c82cceea080e02d2a28f230724";

  const convertKToC = (k) => {
    return (k - 273).toFixed();
  };

  const classColor = getColorClass(tempC);

  const getWeatherIcon = (main) => {
    const iconData = WeatherIcon.find(
      (weather) => weather.main.toLowerCase() === main.toLowerCase()
    );
    return iconData ? iconData.img : "";
  };

  const fetchWeather = (cityName) => {
    const urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    fetch(urlApi)
      .then((res) => res.json())
      .then((data) => {
        setCity(data);
        if(data && data.main)
        setTempC(convertKToC(data.main.temp));
      })
      .catch((err)=>{
        console.log("Error fetching weather data:", err);
      })
  }

  useEffect(() => {
    fetchWeather(word)
  }, [word]);

  const handleSearch = () => {
    setWord(searchTerm)
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-cyan-300 to-blue-400">
      <section className="w-1/2">
        <div>
          <label className="input input-bordered flex items-center gap-2">
            <FontAwesomeIcon icon={faTreeCity} />
            <input
              type="text"
              className="grow"
              placeholder="Search City"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              onKeyDown={(e)=>{
                  if (e.key === 'Enter') handleSearch();
              }}
            />
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </label>
        </div>

        <div className="flex flex-row items-center justify-center my-4">
          {city && city.name ? (
            <>
              {" "}
              <span className="text-4xl text-red-500 font-bold mx-1">
                {city.name}
              </span>
              <p className="text-4xl text-black">|</p>
              <span className="mx-1 text-4xl text-black font-bold">
                {city.sys.country}
              </span>
            </>
          ) : (
            <>
              <p>Loading...</p>
            </>
          )}
        </div>

        <div>
          <div className="flex flex-col items-center justify-center border-0 rounded-xl bg-white bg-opacity-70 pb-4">
            {city && city.main && city.weather ? (
              <>
                {" "}
                <div className="flex flex-row">
                  <img
                    src={getWeatherIcon(city.weather[0].main)}
                    alt={city.weather[0].description}
                  />

                  <p
                    className={`text-4xl mx-2 ${classColor} flex items-center justify-center`}
                  >
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
              <>Loading...</>
            )}
          </div>

          <div className="flex flex-row items-center justify-center my-4">
            {city && city.main ? (
              <>
                {" "}
                <div className="basis-1/2 border-0 rounded-2xl bg-white opacity-70 p-2 text-center mr-2">
                  <FontAwesomeIcon icon={faDroplet} className="mx-2" />
                  <span>{city.main.humidity}%</span>
                </div>
              </>
            ) : (
              <>
                <p>loading...</p>
              </>
            )}
            {city && city.wind ? (
              <>
                {" "}
                <div className="basis-1/2 border-0 rounded-2xl bg-white opacity-70 p-2 text-center ml-2">
                  <FontAwesomeIcon icon={faWind} className="mx-2" />
                  <span>{city.wind.speed}m/s</span>
                </div>
              </>
            ) : (
              <>
                <p>loading...</p>
              </>
            )}
          </div>
        </div>
        <div>
          <CurrentTime />
        </div>
      </section>
    </div>
  );
}

export default App;

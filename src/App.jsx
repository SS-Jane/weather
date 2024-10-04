import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faTreeCity,
  faCloudSun,
  faWind,
  faDroplet,
} from "@fortawesome/free-solid-svg-icons";
import { CurrentTime } from "./components/CurrentTimeComponent";
import { useEffect, useState } from "react";

function App() {
  const [city, setCity] = useState({});

  const getColorClass = (temp) => {
    if (temp < 0) return "text-blue-600";
    if (temp < 10) return "text-blue-400";
    if (temp < 20) return "text-green-500";
    if (temp < 30) return "text-yellow-500";
    if (temp < 40) return "text-orange-500";
    return "text-red-600";
  };

  const classColor = getColorClass();

  useEffect(() => {
    const cityName = "Bangkok";
    const apiKey = "25d3a3c82cceea080e02d2a28f230724";
    const urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    fetch(urlApi)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCity(data);
      });
  }, []);

  const convertKToC = (k) => {
    return (k-273).toFixed();
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-cyan-300 to-blue-400">
      <section className="w-1/2">
        <div>
          <label className="input input-bordered flex items-center gap-2">
            <FontAwesomeIcon icon={faTreeCity} />
            <input type="text" className="grow" placeholder="Search City" />
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </label>
        </div>
        <div className="flex flex-row items-center justify-center my-4">
          <span className="text-4xl text-red-500 font-bold mx-1">{city.name}</span>
          <p className="text-4xl text-black">|</p>
          <span className="mx-1 text-4xl text-black font-bold">{city.sys.country}</span>
        </div>
        <div>
          <div className="flex flex-col items-center justify-center border-0 rounded-xl bg-white bg-opacity-70 p-4">
            <div className="flex flex-row">
              <FontAwesomeIcon icon={faCloudSun} className="h-10 w-10 mx-2" />
              <p className="text-3xl mx-2 text-yellow-400">{convertKToC(city.main.temp)} °C
              </p>
            </div>

            <div className="flex flex-row items-center justify-center">
              <span className="text-orange-500 text-2xl">{convertKToC(city.main.temp_max)} °C
              </span>
              <p className="text-2xl text-black mx-2">|</p>
              <span className="text-sky-500 text-2xl">{convertKToC(city.main.temp_min)} °C
              </span>
            </div>
          </div>

          <div className="flex flex-row items-center justify-center my-4">
            <div className="basis-1/3 border-0 rounded-2xl bg-white opacity-70 p-2 text-center ">
              <p>Feel good</p>
            </div>
            <div className="basis-1/3 border-0 rounded-2xl bg-white opacity-70 p-2 text-center mx-4">
              <FontAwesomeIcon icon={faDroplet} className="mx-2" />
              <span>Huminity:</span>
            </div>
            <div className="basis-1/3 border-0 rounded-2xl bg-white opacity-70 p-2 text-center ">
              <FontAwesomeIcon icon={faWind} className="mx-2" />
              <span>wind : 100</span>
            </div>
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

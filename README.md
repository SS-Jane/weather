# 🌦️ Weather App

A simple weather application built with React that allows users to search for the current weather conditions in any city. The app includes features like real-time spell-check suggestions, dynamic weather displays, and a sleek UI! 🚀

[Weather app demo](https://weather-app-react-two-ruddy.vercel.app)

---

## ✨ Features

- 🔍 Search weather conditions by city name.

- ✅ Auto-suggest corrections for misspelled city names using a smart Levenshtein distance algorithm.

- 🌡️ Display current temperature, humidity (💧), and wind speed (🌪️).

- 🎨 Dynamic weather icons and color-coded temperature indicators.

- 📱 Responsive design powered by Tailwind CSS.

---

## 🛠️ Technologies Used

- **⚛️ React**: Core UI framework.

- **🚀 Axios**: Fetch data from OpenWeatherMap API.

- **🖼️ FontAwesome**: Stunning icons for weather visuals.

- **🪶 Tailwind CSS**: Modern, utility-first styling.

- **🌍 Cities.json**: Global city dataset for spell-check magic.

---

## 🚀 Installation

1.  **Clone the repo**:

```bash

git clone https://github.com/SS-Jane/weather.git

cd weather-app

```

2.  **Install dependencies**:

```bash

npm install

```

3.  **Add API key**:

- Create `.env` and include:

```env

REACT_APP_WEATHER_API_KEY=your_api_key_here # 🔑openweathermap

```

4.  **Start the app**:

```bash

npm run dev # 🚀 vite/react

```

5.  **Open your browser**

---

## 📷 Screenshot

1. **Home page**

![Reference Image](/public/assets/default_page.png)

2. **Spell check**

![Reference Image](/public/assets/city_spell_check.png)

---

## 📷 Score

1. **Lighthouse score : Mobile**

![Reference Image](/public/assets/mobile_lighthouse_score.png)

2. **Lighthouse score : Desktop**

![Reference Image](/public/assets/desktop_lighthouse_score.png)

---

## 📁 File Structure

```

weather-app/

├── public/

├── src/

│ ├── components/ # 🧩 React components

│ ├── data/ # 📊 City/icon datasets

│ ├── utils/ # 🔧 Helper functions

│ ├── App.jsx # 🖥️ Main component

│ └── ...

└── README.md # 📖 You're here!

```

---

## 🌟 How It Works

1.  **🏙️ City Search**: Type a city name. Misspelled? We’ll suggest fixes using _Levenshtein distance_!

2.  **✏️ Spell Check**: Instantly match input to real cities from `cities.json`.

3.  **📡 Fetch Data**: Pull live weather stats from OpenWeatherMap.

4.  **☀️ Display**: Dynamic UI shows temperature (🌡️), humidity (💧), wind (🌪️), and icons!

---

## 🔗 Dependencies

- [React](https://reactjs.org/) ⚛️

- [OpenWeatherMap API](https://openweathermap.org/api) 🌤️

- [Tailwind CSS](https://tailwindcss.com/) 🎨

---

## ⚙️ Customization

- **API Key**: Replace `.env` key 🔑 with yours.

- **Styling**: Tweak Tailwind classes for a fresh look! 💅

---

## 🚧 Future Enhancements

- 🌐 Multi-language support for weather descriptions.

- 📅 Hourly/weekly forecasts.

- 📍 Geolocation-based auto-detect.

- 💾 Offline caching for frequent searches.

---

## 📜 License

MIT Licensed — go wild! 🎉

---

## 🤝 Contributions

PRs welcome! Fork, tweak, and submit! 🛠️

---

## 📧 Contact

Reach out: Superjane.prodev@gmail.com 📬

---

**Happy coding!** 👨💻👩💻

_May your weather always be sunny!_ ☀️✨

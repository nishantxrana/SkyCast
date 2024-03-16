import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const API_KEY = "ed5e345f23b63171fa07735d2d32e6d0";

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/weather", async (req, res) => {
  try {
    const { city } = req.body;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await axios.get(apiUrl);
    console.log(response);
    const weatherData = {
      city: response.data.name,
      country: response.data.sys.country,
      temp: response.data.main.temp,
      feels_like: response.data.main.feels_like,
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      id: response.data.weather[0].id,
      cod: response.data.cod,
    };
    res.render("weather.ejs", { content: weatherData });
  } catch (error) {
    // Render index.ejs with error message
    res.render("index.ejs", { errMsg: `${req.body.city}` });
  }
});

app.get("*", (req, res) => {
  res.render("errors.ejs");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

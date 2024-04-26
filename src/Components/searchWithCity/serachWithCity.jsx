import React, { useState } from "react";
import { Input, Card, Typography, Space, Spin, Row, Col } from "antd";
import axios from "axios";
import "./SearchWithCity.css";

const { Title } = Typography;

const SearchWithCity = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!city) {
      setError("Please enter a city name");
      return;
    }
    const cityRegex = /^[A-Za-z\s]+$/;
    if (!cityRegex.test(city)) {
      setError("City name should only contain alphabets and spaces");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=fb1e7b51c6b72e210f7ff0c321ad5286`
      );
      if (response.data) {
        console.log("Latitude:", response.data.coord.lat);
        console.log("Longitude:", response.data.coord.lon);
        localStorage.removeItem("latitude");
        localStorage.removeItem("longitude");
        localStorage.setItem("latitude", response.data.coord.lat);
        localStorage.setItem("longitude", response.data.coord.lon);

        setWeatherData(response.data);
        setError("");
      } else {
        setError("City not found");
        setWeatherData(null);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Error fetching weather data");
      setWeatherData(null);
    }

    setLoading(false);
  };

  return (
    <div className="search-container">
      <Title level={2} className="title">
        Search with City
      </Title>
      <Input
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="input"
      />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
      {loading ? (
        <div className="loading-container">
          <Spin size="large" />
        </div>
      ) : (
        weatherData && (
          <Card
            title={`Weather in ${weatherData.name}`}
            className="weather-card"
          >
            <Row gutter={[16, 16]} style={{ padding: "20px" }}>
              <Col span={12}>
                <Card title="Weather" bordered={false}>
                  <p>{weatherData.weather[0].description}</p>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Temperature" bordered={false}>
                  <p>{weatherData.main.temp} K</p>
                </Card>
              </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ padding: "20px" }}>
              <Col span={12}>
                <Card title="Feels Like" bordered={false}>
                  <p>{weatherData.main.feels_like} K</p>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Humidity" bordered={false}>
                  <p>{weatherData.main.humidity}%</p>
                </Card>
              </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ padding: "20px" }}>
              <Col span={12}>
                <Card title="Wind Speed" bordered={false}>
                  <p>{weatherData.wind.speed} m/s</p>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Sunrise" bordered={false}>
                  <p>
                    {new Date(
                      weatherData.sys.sunrise * 1000
                    ).toLocaleTimeString()}
                  </p>
                </Card>
              </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ padding: "20px" }}>
              <Col span={12}>
                <Card title="Sunset" bordered={false}>
                  <p>
                    {new Date(
                      weatherData.sys.sunset * 1000
                    ).toLocaleTimeString()}
                  </p>
                </Card>
              </Col>
            </Row>
          </Card>
        )
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default SearchWithCity;

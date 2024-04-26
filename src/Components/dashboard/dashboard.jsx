import React, { useState, useEffect } from "react";
import { Card, Row, Col, Typography, Spin } from "antd";
import axios from "axios";
import "./Dashboard.css"; 

const { Title } = Typography;

const Dashboard = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [latitude, setLatitude] = useState(localStorage.getItem("latitude"));
  const [longitude, setLongitude] = useState(localStorage.getItem("longitude"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (latitude && longitude) {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=fb1e7b51c6b72e210f7ff0c321ad5286`
          );
          setWeatherData(response.data.list);
          setLoading(false);
        } else {
          console.error("Latitude or longitude not found in localStorage");
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
  }, [latitude, longitude]); // Update when latitude or longitude changes

  // Listen for changes in localStorage and update state accordingly
  useEffect(() => {
    const handleStorageChange = () => {
      setLatitude(localStorage.getItem("latitude"));
      setLongitude(localStorage.getItem("longitude"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className="dashboard-container">
      <div className="background-image" />
      <div className="content-container">
        <Title level={2} className="dashboard-title" style={{ color: "white" }}>
          Weather Dashboard
        </Title>
        <div className="dashboard-content">
          {loading ? (
            <div className="loading-container">
              <Spin size="large" />
            </div>
          ) : (
            <Row gutter={[16, 16]} className="weather-row">
              {weatherData.slice(0, 7).map((weather, index) => (
                <Col key={index} xs={24} sm={12} md={8} lg={6}>
                  <Card
                    title={new Date(weather.dt_txt).toLocaleTimeString()}
                    className="weather-card"
                  >
                    <p className="weather-info">
                      <span className="info-label">Temperature:</span>{" "}
                      {weather.main.temp} K
                    </p>
                    <p className="weather-info">
                      <span className="info-label">Feels like:</span>{" "}
                      {weather.main.feels_like} K
                    </p>
                    <p className="weather-info">
                      <span className="info-label">Description:</span>{" "}
                      {weather.weather[0].description}
                    </p>
                    <p className="weather-info">
                      <span className="info-label">Wind Speed:</span>{" "}
                      {weather.wind.speed} m/s
                    </p>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

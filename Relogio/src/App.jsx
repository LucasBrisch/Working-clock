import React, { useEffect, useState } from "react";
import "./App.css";

function getTimeAngles(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // Ângulo do sol: 360° em 24h
  const sunAngle = ((hours * 3600 + minutes * 60 + seconds) / 86400) * 360;
  // Ângulo da lua: oposta ao sol
  const moonAngle = (sunAngle + 180) % 360;

  return {
    hourAngle: ((hours % 12) + minutes / 60) * 30,
    minuteAngle: (minutes + seconds / 60) * 6,
    secondAngle: seconds * 6,
    sunAngle,
    moonAngle,
  };
}

export default function App() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const { hourAngle, minuteAngle, secondAngle, sunAngle, moonAngle } = getTimeAngles(now);

  return (
    <div className="container">
      <div className="orbit">
  <div
    className="sun"
    style={{ transform: `translate(-50%, -50%) rotate(${sunAngle}deg) translateY(-190px)` }}
  />
  <div
    className="moon"
    style={{ transform: `translate(-50%, -50%) rotate(${moonAngle}deg) translateY(-190px)` }}
  />
</div>
      <div className="clock">
        <div
          className="hand hour"
          style={{ transform: `rotate(${hourAngle}deg)` }}
        />
        <div
          className="hand minute"
          style={{ transform: `rotate(${minuteAngle}deg)` }}
        />
        <div
          className="hand second"
          style={{ transform: `rotate(${secondAngle}deg)` }}
        />
        <div className="center-dot" />
      </div>
    </div>
  );
}
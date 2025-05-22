// Файл: src/App.js

import React, { useState, useEffect } from "react";
import './App.css';

function App() {
  const [timerStarted, setTimerStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60 * 60);
  const [alertShown, setAlertShown] = useState(false);

  useEffect(() => {
    let interval;
    if (timerStarted && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !alertShown) {
      const audio = new Audio("https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg");
      audio.play();
      alert("Пора зробити зарядку!");
      setAlertShown(true);
    }
    return () => clearInterval(interval);
  }, [timerStarted, timeLeft, alertShown]);

  const startTimer = () => {
    setTimerStarted(true);
    setTimeLeft(60 * 60);
    setAlertShown(false);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container">
      <h1 className="title">Трекер сидіння 🪑</h1>
      <button onClick={startTimer} className="start-button">
        Сів на стілець
      </button>
      {timerStarted && (
        <p className="timer-text">Залишилось часу: {formatTime(timeLeft)}</p>
      )}
    </div>
  );
}

export default App;

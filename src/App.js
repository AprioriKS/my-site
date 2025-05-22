// Файл: src/App.js

import React, { useState, useEffect } from "react";

function App() {
  const [timerStarted, setTimerStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 хвилин у секундах
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
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-6">Трекер сидіння 🪑</h1>
      <button
        onClick={startTimer}
        className="text-2xl bg-green-600 text-white px-6 py-4 rounded-2xl shadow-lg hover:bg-green-700"
      >
        Сів на стілець
      </button>
      {timerStarted && (
        <p className="mt-6 text-xl">Залишилось часу: {formatTime(timeLeft)}</p>
      )}
    </div>
  );
}

export default App;


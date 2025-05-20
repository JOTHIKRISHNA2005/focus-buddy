import React, { useState, useEffect, useRef } from "react";

function Timer() {
  const WORK_TIME = 25 * 60;
  const SMALL_BREAK = 5 * 60;
  const LARGE_BREAK = 15 * 60;

  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);
  const [mode, setMode] = useState("work"); // work, smallBreak, largeBreak
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);

            if (mode === "work") {
              setSessionCount((count) => count + 1);
            }

            // Auto switch mode after timer ends
            if (mode === "work") {
              setMode("smallBreak");
              setTimeLeft(SMALL_BREAK);
            } else {
              setMode("work");
              setTimeLeft(WORK_TIME);
            }

            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning, mode]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const changeMode = (newMode) => {
    setIsRunning(false);
    setMode(newMode);
    if (newMode === "work") setTimeLeft(WORK_TIME);
    else if (newMode === "smallBreak") setTimeLeft(SMALL_BREAK);
    else if (newMode === "largeBreak") setTimeLeft(LARGE_BREAK);
  };

  return (
    <div className="timer-container">
      <div className="timer-display">{formatTime(timeLeft)}</div>

      <div className="mode-buttons">
        <button
          onClick={() => changeMode("work")}
          className={mode === "work" ? "active" : ""}
        >
          Work
        </button>
        <button
          onClick={() => changeMode("smallBreak")}
          className={mode === "smallBreak" ? "active" : ""}
        >
          Small Break
        </button>
        <button
          onClick={() => changeMode("largeBreak")}
          className={mode === "largeBreak" ? "active" : ""}
        >
          Large Break
        </button>
      </div>

      <div className="control-buttons">
        <button onClick={() => setIsRunning(true)}>Start</button>
        <button onClick={() => setIsRunning(false)}>Pause</button>
        <button
          onClick={() =>
            setTimeLeft(
              mode === "work"
                ? WORK_TIME
                : mode === "smallBreak"
                ? SMALL_BREAK
                : LARGE_BREAK
            )
          }
        >
          Reset
        </button>
      </div>

      <div className="session-info">Sessions completed: {sessionCount}</div>
    </div>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="app-container">
      <button
        className="dark-mode-toggle"
        onClick={() => setDarkMode(!darkMode)}
      >
        Switch to {darkMode ? "Light" : "Dark"} Mode
      </button>
      <Timer />
    </div>
  );
}

export default App;

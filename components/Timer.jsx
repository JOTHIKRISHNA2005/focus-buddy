import React, { useState, useEffect, useRef } from "react";

function Timer() {
  const WORK_TIME = 25 * 60;
  const SMALL_BREAK = 5 * 60;
  const LARGE_BREAK = 15 * 60;

  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);
  const [mode, setMode] = useState("work"); // "work", "smallBreak", "largeBreak"
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

            // Auto-switch mode after timer ends (optional)
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

  // Change timer mode and reset timer
  const changeMode = (newMode) => {
    setIsRunning(false);
    setMode(newMode);
    if (newMode === "work") setTimeLeft(WORK_TIME);
    else if (newMode === "smallBreak") setTimeLeft(SMALL_BREAK);
    else if (newMode === "largeBreak") setTimeLeft(LARGE_BREAK);
  };

  return (
    <>
      <div className="timer-display">{formatTime(timeLeft)}</div>

      <div style={{ marginBottom: "1rem", textAlign: "center" }}>
        <button
          onClick={() => changeMode("work")}
          style={{ fontWeight: mode === "work" ? "bold" : "normal" }}
        >
          Work
        </button>
        <button
          onClick={() => changeMode("smallBreak")}
          style={{ fontWeight: mode === "smallBreak" ? "bold" : "normal" }}
        >
          Small Break
        </button>
        <button
          onClick={() => changeMode("largeBreak")}
          style={{ fontWeight: mode === "largeBreak" ? "bold" : "normal" }}
        >
          Large Break
        </button>
      </div>

      <div>
        <button onClick={() => setIsRunning(true)}>Start</button>
        <button onClick={() => setIsRunning(false)}>Pause</button>
        <button onClick={() => setTimeLeft(mode === "work" ? WORK_TIME : mode === "smallBreak" ? SMALL_BREAK : LARGE_BREAK)}>
          Reset
        </button>
      </div>

      <div className="session-info">Sessions completed: {sessionCount}</div>
    </>
  );
}

export default Timer;

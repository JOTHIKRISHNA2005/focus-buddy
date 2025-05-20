import React from "react";

export default function Controls({
  isRunning,
  onStartPause,
  onReset,
  onSetTime,
  onResetCount,
}) {
  const baseBtn =
    "px-5 py-2 m-2 rounded-full font-semibold shadow-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const startPauseStyle = isRunning
    ? "bg-yellow-400 hover:bg-yellow-500 text-gray-900 focus:ring-yellow-400"
    : "bg-green-500 hover:bg-green-600 text-white focus:ring-green-500";

  return (
    <div className="flex flex-wrap justify-center">
      <button className={`${baseBtn} ${startPauseStyle}`} onClick={onStartPause}>
        {isRunning ? "Pause" : "Start"}
      </button>

      <button
        className={`${baseBtn} bg-red-500 hover:bg-red-600 text-white focus:ring-red-500`}
        onClick={onReset}
      >
        Reset Timer
      </button>

      <button
        className={`${baseBtn} bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500`}
        onClick={() => onSetTime(5)}
      >
        5 Min Break
      </button>

      <button
        className={`${baseBtn} bg-purple-600 hover:bg-purple-700 text-white focus:ring-purple-600`}
        onClick={() => onSetTime(15)}
      >
        15 Min Break
      </button>

      <button
        className={`${baseBtn} bg-gray-400 hover:bg-gray-500 text-white focus:ring-gray-400`}
        onClick={onResetCount}
      >
        Reset Sessions
      </button>
    </div>
  );
}

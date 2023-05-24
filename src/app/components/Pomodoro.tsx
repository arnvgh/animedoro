/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { FC, useState, useEffect } from "react";
import Config from "./Config";

interface pomodoroProps {}

const pomodoro: FC<pomodoroProps> = ({}) => {
  const [timer, setTimer] = useState(3000);
  const [isRunning, setIsRunning] = useState(false);
  const [isWatching, setisWatching] = useState(false);
  const [workTime, setWorkTime] = useState(25 * 60); // default work time is 25 minutes
  const [watchTime, setWatchTime] = useState(15 * 60); // default watch time is 15 minutes

  useEffect(() => {
    if (isRunning && timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer, isRunning]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    isWatching ? setTimer(watchTime) : setTimer(workTime);
  };

  const startWatching = () => {
    setisWatching(true);
    setTimer(watchTime);
  };

  const stratWorking = () => {
    setisWatching(false);
    setTimer(workTime);
  };

  const getTimer = (timer: any) => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  };

  const handleConfigSubmit = (workTime: number, watchTime: number) => {
    setWorkTime(workTime);
    setWatchTime(watchTime);
    if (!isWatching) {
      setTimer(workTime);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold">animedoro</h1>
      <div className="flex gap-3 p-5 justify-center">
        <div className="btn-group">
          <button
            className={`btn ${
              !isWatching ? "btn-secondary" : "btn-ghost"
            } btn-sm`}
            onClick={stratWorking}
          >
            📚 Work
          </button>
          <button
            className={`btn ${
              isWatching ? "btn-secondary" : "btn-ghost"
            } btn-sm`}
            onClick={startWatching}
          >
            📺 Watch
          </button>
        </div>
      </div>
      <div className="text-8xl font-bold">
        <div className="flex flex-col gap-3">{getTimer(timer)}</div>
      </div>
      <div className="flex gap-4 mt-4 justify-center">
        <button className="btn btn-primary btn-sm" onClick={toggleTimer}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button className="btn btn-sm" onClick={resetTimer}>
          Reset
        </button>

        {/* The button to open modal */}
        <label htmlFor="my-modal-3" className="btn btn-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </label>

        {/* Put this part before </body> tag */}
        <input type="checkbox" id="my-modal-3" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative">
            <Config onSubmit={handleConfigSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default pomodoro;

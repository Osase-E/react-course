import { useState, useRef } from "react";

import Results from "./Results";

export default function Challenges({ title, time }) {
  const timer = useRef();
  const dialog = useRef();

  const [timeLeft, setTimeLeft] = useState(time * 1000);
  const [timerActive, setTimer] = useState(false);

  if (timeLeft <= 0) {
    dialog.current.showModal();
    clearInterval(timer.current);
  }

  function handleClear() {
    setTimeLeft(time * 1000);
    setTimer(false);
  }

  function handleStart() {
    timer.current = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 10);
    }, 10);
    setTimer(true);
  }

  function handleStop() {
    dialog.current.showModal();
    clearInterval(timer.current);
  }

  return (
    <>
      <Results
        results={timeLeft}
        targetTime={time}
        ref={dialog}
        onClear={handleClear}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {time} second{time > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerActive ? handleStop : handleStart}>
            {timerActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        {timeLeft <= 0 ? <p>You Lost</p> : null}
      </section>
    </>
  );
}

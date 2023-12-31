import { forwardRef } from "react";
import { createPortal } from "react-dom";

const Results = forwardRef(function Results(
  { results, targetTime, onClear },
  ref
) {
  const timeRemaining = results / 1000;
  const score = Math.round((1 - results / (targetTime * 1000)) * 100);

  return createPortal(
    <dialog ref={ref} className="result-modal">
      {results <= 0 ? <h2>You lost</h2> : <h2>Your Score: {score}</h2>}
      <p>You stopped the timer with {timeRemaining.toFixed(2)} seconds left</p>

      <form method="dialog" onSubmit={onClear}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default Results;

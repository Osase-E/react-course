import { useState } from "react";

export default function Input({ values, onInvestmentChange, ...props }) {
  function handleInvestmentChange(event, attribute) {
    onInvestmentChange((prevInvestments) => {
      const newInvestment = {
        ...prevInvestments,
        [attribute]: +event.target.value,
      };
      return newInvestment;
    });
  }

  return (
    <div className="input-group">
      <p>
        <label>Initial Investment</label>
        <input
          type="number"
          min="0.00"
          value={values.initialInvestment}
          onChange={(event) =>
            handleInvestmentChange(event, "initialInvestment")
          }
        />
      </p>
      <p>
        <label>Annual Investment</label>
        <input
          type="number"
          min="0.00"
          value={values.annualInvestment}
          onChange={(event) =>
            handleInvestmentChange(event, "annualInvestment")
          }
        />
      </p>
      <p>
        <label>Expected Return</label>
        <input
          type="number"
          min="0.00"
          value={values.expectedReturn}
          onChange={(event) => handleInvestmentChange(event, "expectedReturn")}
        />
      </p>
      <p>
        <label>Duration</label>
        <input
          type="number"
          min="0"
          value={values.duration}
          onChange={(event) => handleInvestmentChange(event, "duration")}
        />
      </p>
    </div>
  );
}

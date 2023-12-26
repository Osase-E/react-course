import Input from "./components/Input";
import Results from "./components/Results";

import { useState } from "react";

const INVESTMENT_VALUES = {
  initialInvestment: 0,
  annualInvestment: 0,
  expectedReturn: 0.0,
  duration: 0,
};

function App() {
  const [investments, setInvestments] = useState(INVESTMENT_VALUES);

  return (
    <main>
      <section id="user-input">
        <Input values={investments} onInvestmentChange={setInvestments} />
      </section>
      {investments.duration > 0 && (
        <section>
          <Results values={investments} />
        </section>
      )}
    </main>
  );
}

export default App;

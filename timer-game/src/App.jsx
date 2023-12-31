import Player from "./components/Player.jsx";
import Challenges from "./components/Challenges.jsx";

import { useRef } from "react";

function App() {
  const timer = useRef();

  return (
    <>
      <Player />
      <div id="challenges">
        <Challenges title="Easy" time={1} />
        <Challenges title="Not Easy" time={5} />
        <Challenges title="Medium" time={10} />
        <Challenges title="Tough" time={15} />
      </div>
    </>
  );
}

export default App;

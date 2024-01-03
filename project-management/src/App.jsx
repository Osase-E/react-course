import { useContext } from "react";
import { ProjectContext, ProjectProvider } from "./store/projects-store.jsx";
import Dashboard from "./components/Dashboard.jsx";

function App() {
  return (
    <ProjectProvider>
      <Dashboard />
    </ProjectProvider>
  );
}

export default App;

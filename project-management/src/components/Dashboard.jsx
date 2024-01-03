import { useContext } from "react";
import NewProject from "./NewProject.jsx";
import NoProject from "./NoProject.jsx";
import ProjectSidebar from "./ProjectSidebar.jsx";
import { ProjectContext } from "../store/projects-store.jsx";
import Project from "./Project.jsx";

export default function Dashboard() {
  const ProjectCxt = useContext(ProjectContext);

  let content = <NoProject />;

  if (ProjectCxt.currentProject === null) {
    content = <NoProject />;
  } else if (ProjectCxt.currentProject === undefined) {
    content = <NewProject />;
  } else {
    content = <Project />;
  }

  return (
    <>
      <ProjectSidebar />
      {content}
    </>
  );
}

import { useContext } from "react";
import { ProjectContext } from "../store/projects-store";

export default function ProjectSidebar() {
  const ProjectCxt = useContext(ProjectContext);

  const className =
    "mb-8 px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100";
  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
        Your Projects
      </h2>
      <div>
        <button
          onClick={() => ProjectCxt.onProjectSelect(undefined)}
          className={className}
        >
          + Add Project
        </button>
      </div>

      <ul>
        {ProjectCxt.projects.map((project) => {
          let cssClass =
            "w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800";
          if (project.projectId === ProjectCxt.currentProject) {
            cssClass += " bg-stone-800 text-stone-200";
          } else {
            cssClass += " text-stone-400";
          }
          return (
            <li key={project.projectId}>
              <button
                className={cssClass}
                onClick={() => ProjectCxt.onProjectSelect(project.projectId)}
              >
                {project.title}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

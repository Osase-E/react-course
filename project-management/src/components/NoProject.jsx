import { useContext } from "react";
import noProjectsImage from "../assets/no-projects.png";
import { ProjectContext } from "../store/projects-store";

export default function NoProject() {
  const ProjectCxt = useContext(ProjectContext);
  return (
    <div className="mt-24 text-center w-2/3">
      <img
        src={noProjectsImage}
        alt="a blank task board"
        className="w-16 h-16 object-contain mx-auto"
      />
      <p className="text-stone-600 mb-4">No projects available!</p>
      <button
        onClick={() => ProjectCxt.onProjectSelect(undefined)}
        className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100"
      >
        Create a project
      </button>
    </div>
  );
}

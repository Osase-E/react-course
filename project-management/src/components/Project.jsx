import { useContext, useRef } from "react";
import { ProjectContext } from "../store/projects-store.jsx";
import Input from "./Input.jsx";

export default function Project() {
  const ProjectCxt = useContext(ProjectContext);
  const taskInput = useRef();

  const project = ProjectCxt.projects.find(
    (project) => project.projectId === ProjectCxt.currentProject
  );

  const formattedDate = new Date(project.dueDate).toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  function handleClick(description) {
    ProjectCxt.onTaskCreate(description);
    taskInput.current.value = "";
  }
  return (
    <div className="w-[35rem] mt-16">
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-stone-600 mb-2">
            {project.title}
          </h1>
          <button
            className="text-stone-700 hover:text-red-500"
            onClick={() => ProjectCxt.onProjectDelete(project.projectId)}
          >
            Delete
          </button>
        </div>
        <p className="mb-4 text-stone-400">{formattedDate}</p>
        <p className="text-stone-600 whitespace-pre-wrap">
          {project.description}
        </p>
      </header>
      <div className="flex items-center justify-between">
        <Input ref={taskInput} />
        <button
          className="w-1/4 ml-4 px-2 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
          onClick={() => handleClick(taskInput.current.value)}
        >
          Add Task
        </button>
      </div>
      {project.tasks.length > 0 ? (
        <ul className="p-4 mt-8 rounded-md bg-stone-100">
          {project.tasks.map((task) => (
            <li key={task.id} className="flex justify-between my-4">
              <span className="w-7/9 text-stone-800 my-4">
                {task.description}
              </span>
              <button
                className="w-2/9 ml-2 px-4 py-2 text-stone-700 hover:text-red-500"
                onClick={() => ProjectCxt.onTaskDelete(task.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

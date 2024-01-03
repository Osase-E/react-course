import { createContext, useReducer } from "react";

export const ProjectContext = createContext({
  onProjectSelect: () => {},
  onProjectCreate: () => {},
  onProjectDelete: () => {},
  onTaskCreate: () => {},
  onTaskDelete: () => {},
  projects: [],
  currentProject: null,
});

function projectDispatchHandler(state, action) {
  if (action.type === "SELECT") {
    console.log(state);
    return {
      ...state,
      currentProject: action.payload,
    };
  }

  if (action.type === "CREATE_TASK") {
    const updatedState = [...state.projects];
    const projectIndex = updatedState.findIndex(
      (item) => item.projectId === state.currentProject
    );

    if (projectIndex !== -1) {
      const project = { ...updatedState[projectIndex] };
      project.tasks = [
        ...updatedState[projectIndex].tasks,
        {
          id: Math.random(),
          description: action.payload,
        },
      ];

      updatedState[projectIndex] = project;
    }

    return { ...state, projects: updatedState };
  }

  if (action.type === "CREATE_PROJECT") {
    const updatedState = [
      ...state.projects,
      {
        projectId: action.payload.id,
        title: action.payload.title,
        description: action.payload.description,
        dueDate: action.payload.dueDate,
        tasks: [],
      },
    ];
    return { ...state, projects: updatedState };
  }

  if (action.type === "DEL_TASK") {
    const updatedState = [...state.projects];
    const projectIndex = updatedState.findIndex(
      (item) => item.projectId === state.currentProject
    );
    if (projectIndex !== -1) {
      updatedState[projectIndex].tasks = updatedState[
        projectIndex
      ].tasks.filter((task) => task.id !== action.payload);
    }

    return { ...state, projects: updatedState };
  }

  if (action.type === "DEL_PROJECT") {
    let selectedProject = null;
    const updatedState = state.projects.filter(
      (project) => project.projectId !== action.payload
    );

    if (updatedState.length > 0) {
      selectedProject = updatedState[0].projectId;
    }

    return {
      ...state,
      currentProject: selectedProject,
      projects: updatedState,
    };
  }
}

export function ProjectProvider({ children }) {
  const [projectState, projectDispatch] = useReducer(projectDispatchHandler, {
    projects: [],
    currentProject: null,
  });

  function handleProjectSelect(id) {
    projectDispatch({
      type: "SELECT",
      payload: id,
    });
  }

  function handleTaskCreate(description) {
    projectDispatch({
      type: "CREATE_TASK",
      payload: description,
    });
  }

  function handleProjectCreate(payload) {
    projectDispatch({
      type: "CREATE_PROJECT",
      payload,
    });
  }

  function handleTaskDelete(taskId) {
    projectDispatch({
      type: "DEL_TASK",
      payload: taskId,
    });
  }

  function handleProjectDelete(projectId) {
    projectDispatch({
      type: "DEL_PROJECT",
      payload: projectId,
    });
  }

  const ctx = {
    onProjectSelect: handleProjectSelect,
    onTaskCreate: handleTaskCreate,
    onProjectCreate: handleProjectCreate,
    onTaskDelete: handleTaskDelete,
    onProjectDelete: handleProjectDelete,
    projects: projectState.projects,
    currentProject: projectState.currentProject,
  };

  return (
    <ProjectContext.Provider value={ctx}>
      <main className="h-screen my-8 flex gap-8">{children} </main>
    </ProjectContext.Provider>
  );
}

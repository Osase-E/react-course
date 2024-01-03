import { useContext, useRef } from "react";
import Input from "./Input";
import { ProjectContext } from "../store/projects-store";
import Modal from "./Modal";

export default function NewProject() {
  const ProjectCxt = useContext(ProjectContext);
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();

  const modal = useRef();

  function handleClick() {
    const isInvalid =
      title.current.value.trim() === "" ||
      description.current.value.trim() === "" ||
      dueDate.current.value.trim() === "";

    if (isInvalid) {
      modal.current.open();
    }

    if (!isInvalid) {
      ProjectCxt.onProjectCreate({
        id: Math.random(),
        title: title.current.value,
        description: description.current.value,
        dueDate: dueDate.current.value,
      });

      title.current.value = "";
      description.current.value = "";
      dueDate.current.value = "";
    }
  }

  return (
    <div>
      <Modal ref={modal} buttonCaption="Close">
        <h2 className="text-xl font-bold text-stone-700 my-4">
          Invalid Inputs
        </h2>
        <p className="text-stone-600 mb-4">
          Please make sure all inputs are filled in
        </p>
      </Modal>
      <menu className="flex items-center justify-end gap-4 my-4">
        <li>
          <button
            className="text-stone-700 hover:text-red-500"
            onClick={() => ProjectCxt.onProjectSelect(null)}
          >
            Cancel
          </button>
        </li>
        <li>
          <button
            className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
            onClick={handleClick}
          >
            Save
          </button>
        </li>
      </menu>
      <Input ref={title} label="Title" />
      <Input ref={description} label="Description" textArea />
      <Input type="date" ref={dueDate} label="Due Date" />
    </div>
  );
}

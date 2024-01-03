import { forwardRef } from "react";

const Input = forwardRef(function Input({ label, textArea, ...props }, ref) {
  const className =
    "w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";
  return (
    <>
      <label>{label}</label>
      {textArea ? (
        <textarea ref={ref} className={className} {...props} />
      ) : (
        <input ref={ref} className={className} {...props} />
      )}
    </>
  );
});

export default Input;

/* eslint-disable react/prop-types */
import { forwardRef } from "react";

function FormComponent({ children, isButtonEnabled, onChange, onSubmit }, ref) {
  return (
    <form className="form" onChange={onChange} onSubmit={onSubmit} ref={ref}>
      {children}
      <button type="submit" disabled={!isButtonEnabled}>
        Register
      </button>
    </form>
  );
}

export const Form = forwardRef(FormComponent);

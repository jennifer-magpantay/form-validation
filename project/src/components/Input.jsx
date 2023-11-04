/* eslint-disable react/prop-types */

export default function Input({
  label,
  type,
  id,
  value,
  placeholder,
  onChange,
  ...props
}) {
  return (
    <div className="form--row">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        {...props}
      />
    </div>
  );
}

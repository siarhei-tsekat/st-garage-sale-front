interface InputFieldProps {
  label: string;
  id: string;
  type: string;
  errors: any;
  register: any;
  required: any;
  message: string;
  min?: number;
  placeholder: string;
  className?: string;
}

const InputField = (props: InputFieldProps) => {
  const { label, id, type, errors, register, required, message, min, placeholder, className } = props;

  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor="id" className={`${className ? className : ""} font-semibold text-sm text-slate-300`}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={`${className ? className : ""} px-2 py-2 border outline-none bg-transparent text-slate-300 rounded-md ${errors[id]?.message ? "border-red-400" : "border-slate-300"}`}
        {...register(id, {
          required: { value: required, message },
          minLength: min ? { value: min, message: `Minimum ${min} character is required` } : null,
          pattern:
            type === "email"
              ? {
                  value: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+com+$/,
                  message: "Invalid email",
                }
              : type === "url"
              ? {
                  value: /^(https?:\/\/)?(([a-zA-Z0-9\u00a1-\uffff-]+\.)+[a-zA-Z\u00a1-\uffff]{2,})(:\d{2,5})?(\/[^\s]*)?$/,
                  message: "Please enter a valid url",
                }
              : null,
        })}
      />

      {errors[id]?.message && <p className="text-sm font-semibold text-red-200 mt-0">{errors[id]?.message}</p>}
    </div>
  );
};

export default InputField;

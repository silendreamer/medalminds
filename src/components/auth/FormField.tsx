type FormFieldProps = {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  hint?: string;
  autoComplete?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  placeholder?: string;
};

export function FormField({
  label,
  type,
  name,
  value,
  onChange,
  error,
  hint,
  autoComplete,
  required,
  minLength,
  maxLength,
  placeholder,
}: FormFieldProps) {
  const id = `auth-field-${name}`;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = error ? errorId : hint ? hintId : undefined;

  return (
    <div className="auth-field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        className="input"
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
      />
      {error ? (
        <span id={errorId} className="auth-field-error" role="alert">
          {error}
        </span>
      ) : hint ? (
        <span id={hintId} className="auth-field-hint">
          {hint}
        </span>
      ) : null}
    </div>
  );
}

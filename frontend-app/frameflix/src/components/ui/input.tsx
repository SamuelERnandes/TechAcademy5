import {
  InputHTMLAttributes,
  ChangeEvent,
  ForwardedRef,
  forwardRef,
} from "react";

type InputProps = {
  value?: string;
  onChange?:
    | ((value: string) => void)
    | ((e: ChangeEvent<HTMLInputElement>) => void);
} & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef(
  (
    { type = "text", placeholder, value, onChange, ...rest }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (typeof onChange === "function") {
        if (onChange.length === 1) {
          try {
            (onChange as (e: ChangeEvent<HTMLInputElement>) => void)(e);
          } catch {
            (onChange as (value: string) => void)(e.target.value);
          }
        }
      }
    };

    return (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        ref={ref}
        className="border border-gray-300 rounded p-2"
        {...rest}
      />
    );
  }
);

export { Input };

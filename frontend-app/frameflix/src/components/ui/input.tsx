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
          const arg = (onChange as any).toString().match(/\(\s*(\w+)/)?.[1];
          if (arg === "e") {
            (onChange as (e: ChangeEvent<HTMLInputElement>) => void)(e);
          } else {
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

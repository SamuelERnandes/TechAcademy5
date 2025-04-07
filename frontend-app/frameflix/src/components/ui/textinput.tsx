import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
import { HTMLInputTypeAttribute, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface TextInputProps {
  name: string;
  label: string;
  type?: HTMLInputTypeAttribute;
  rules?: object;
}

const TextInput = ({ name, label, type = "text" }: TextInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string;
  const [visible, setVisible] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword ? (visible ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-2 relative">
      <Label htmlFor={name}>{label}</Label>

      <Input
        id={name}
        type={inputType}
        {...register(name)}
        className={`bg-slate-900 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded px-3 py-2 ${
          isPassword ? "pr-10" : ""
        }`}
      />

      {isPassword && (
        <button
          type="button"
          onClick={() => setVisible((prev) => !prev)}
          className="absolute right-2 top-[30px] text-slate-500 hover:text-slate-300 p-1 text-sm rounded"
        >
          {visible ? <EyeOff size={17} /> : <Eye size={17} />}
        </button>
      )}

      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default TextInput;

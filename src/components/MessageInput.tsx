import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { Input } from "./ui/input";

interface MessageInputProps {
  placeholder?: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}
export default function MessageInput({
  id,
  placeholder,
  required,
  register,
  errors,
  type,
}: MessageInputProps) {
  return (
    <div className="w-full">
      <Input
        id={id}
        placeholder={placeholder}
        type={type}
        autoComplete={id}
        {...register(id, { required })}
        className="rounded-full text-primary-text placeholder:text-secondary-text px-5 py-6"
      />
    </div>
  );
}

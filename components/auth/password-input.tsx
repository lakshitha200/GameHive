"use client";

import { Eye, EyeOff, Lock } from "lucide-react";
import { ComponentProps, useState } from "react";
import FormField from "../ui/FormField";

type Props = Omit<ComponentProps<typeof FormField>, "type" | "icon" | "right">;

export default function PasswordInput(props: Props) {
  const [show, setShow] = useState(false);
  return (
    <FormField
      {...props}
      icon={Lock}
      type={show ? "text" : "password"}
      right={
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "Hide password" : "Show password"}
          className="rounded p-2 text-gray-500 transition hover:text-white"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      }
    />
  );
}

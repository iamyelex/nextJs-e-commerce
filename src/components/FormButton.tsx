"use client";

import { ComponentProps } from "react";
// @ts-expect-error
import { experimental_useFormStatus as useFormStatus } from "react-dom";

type FormButtonProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"button">;

export default function FormButton({
  children,
  className,
  ...props
}: FormButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      {...props}
      disabled={pending}
      className={`btn btn-primary ${className}`}
    >
      {pending && <span className="loading loading-spinner" />}
      {children}
    </button>
  );
}

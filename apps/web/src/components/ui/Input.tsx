import {
  forwardRef,
  type InputHTMLAttributes,
} from "react";

interface Props
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;

  error?: string;
}

const Input = forwardRef<
  HTMLInputElement,
  Props
>(
  (
    {
      label,

      error,

      ...props
    },
    ref
  ) => {
    return (
      <div>
        <label className="mb-2 block text-sm font-medium">
          {label}
        </label>

        <input
          ref={ref}
          {...props}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        />

        {error && (
          <p className="mt-1 text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
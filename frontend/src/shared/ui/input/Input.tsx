import { tv } from "tailwind-variants";
import { cn } from "tailwind-variants/lite";

const inputStyles = tv({
  slots: {
    wrapper: "flex flex-col w-full",
    label: "text-sm sm:text-base font-normal text-primary-foreground",
    input: cn(
      "h-[2.5rem] px-[0.3rem] py-0 grow",
      "border-2 border-primary-foreground rounded-sm bg-inherit",
      "text-base text-left font-normal text-primary-foreground placeholder-secondary-foreground",
      "outline-0 focus:ring-1 no-spinner",
      "sm:h-[2.7rem] sm:px-[0.5rem] sm:text-lg",
      "lg:h-[3.2rem] lg:px-[1rem]"
    ),
    bottomText: "text-sm sm:text-base font-normal",
  },
  variants: {
    error: {
      true: { input: "border-error", bottomText: "text-error" },
    },
  },
});

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helperText?: string;
  error?: string | null;
};

function Input({ label: labelText, helperText, error, ...props }: InputProps) {
  const { wrapper, label, input, bottomText } = inputStyles({
    error: !!error,
  });

  return (
    <div className={wrapper()}>
      {labelText && <label className={label()}>{labelText}</label>}
      <input className={input()} {...props} />
      {(error || helperText) && (
        <span className={bottomText()}>{error || helperText}</span>
      )}
    </div>
  );
}

Input.displayName = "Input";
export default Input;

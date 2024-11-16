import clsx from 'clsx';
import { useRef, ChangeEvent, ReactNode } from 'react';

type InputProps = {
  name: string;
  label?: string;
  error?: boolean;
  errorMessage?: string;
  children?: ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  React.SelectHTMLAttributes<HTMLSelectElement>;

const Input = ({
  name,
  label,
  type = 'text',
  placeholder = '',
  required = false,
  value,
  error = false,
  errorMessage,
  children,
  ...props
}: InputProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const autoHeight = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (!textAreaRef.current) return;
    textAreaRef.current.style.height =
      e.target.value === '' ? '64px' : e.target.scrollHeight + 1 + 'px';
  };

  const baseClasses =
    'text2 w-full rounded-b-none rounded-t-md border-b appearance-none bg-transparent py-2 placeholder:text-white-40 focus:pl-2 focus:outline-none !text-white-80';
  const errorClass = error ? 'border-b-red-500' : 'border-b-white-40';

  const renderInputField = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            ref={textAreaRef}
            id={name}
            placeholder={placeholder}
            value={value}
            className={clsx(
              baseClasses,
              'h-16 resize-none !transition-[padding,height]',
              errorClass,
            )}
            onChange={(e) => {
              autoHeight(e);
              props.onChange?.(e);
            }}
            {...props}
          />
        );
      case 'select':
        return (
          <select
            className={clsx(baseClasses, '!transition-[padding]', errorClass)}
            id={name}
            value={value}
            {...props}
          >
            {children}
          </select>
        );
      default:
        return (
          <input
            className={clsx(baseClasses, '!transition-[padding]', errorClass)}
            id={name}
            placeholder={placeholder}
            type={type}
            value={value}
            {...props}
          />
        );
    }
  };

  return (
    <div className="relative flex flex-col gap-4">
      {label && (
        <label className="text2 cursor-pointer" htmlFor={name}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {renderInputField()}
      {errorMessage && <p className="absolute -bottom-5 text-xs text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default Input;

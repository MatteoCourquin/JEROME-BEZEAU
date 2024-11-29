import clsx from 'clsx';
import gsap from 'gsap';
import { forwardRef, ReactNode, useImperativeHandle, useRef } from 'react';

type InputProps = {
  name: string;
  label?: string;
  errorMessage?: string;
  children?: ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  React.SelectHTMLAttributes<HTMLSelectElement>;

const Input = forwardRef<{ inputAnimation: () => void }, InputProps>(
  (
    {
      name,
      label,
      type = 'text',
      placeholder = '',
      required = false,
      value,
      errorMessage,
      children,
      ...props
    },
    ref,
  ) => {
    const inputRef = useRef(null);
    const lineRef = useRef(null);

    const inputAnimation = () => {
      gsap
        .timeline()
        .fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'power2.out' })
        .fromTo(inputRef.current, { y: 96 }, { y: 0, duration: 1, ease: 'power2.out' }, '-=0.5');
    };

    useImperativeHandle(ref, () => ({
      inputAnimation,
    }));

    const baseClasses =
      'text2 w-full rounded-b-none rounded-t-md appearance-none bg-transparent py-2 placeholder:text-white-40 focus:pl-2 focus:outline-none !text-white-80';

    const renderInputField = () => {
      switch (type) {
        case 'textarea':
          return (
            <textarea
              className={clsx(baseClasses, 'h-16 resize-none !transition-[padding,height]')}
              id={name}
              placeholder={placeholder}
              value={value}
              onChange={(e) => props.onChange?.(e)}
              {...props}
            />
          );
        case 'select':
          return (
            <select
              className={clsx(baseClasses, '!transition-[padding]')}
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
              className={clsx(baseClasses, '!transition-[padding]')}
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
        <div className="h-fit overflow-hidden">
          <div ref={inputRef} className="translate-y-24">
            {renderInputField()}
          </div>
          <div
            ref={lineRef}
            className={clsx(
              'absolute bottom-0 left-0 h-px w-full origin-left scale-x-0',
              errorMessage ? 'bg-red-500' : 'bg-white-40',
            )}
          ></div>
        </div>
        {errorMessage && <p className="absolute -bottom-5 text-xs text-red-500">{errorMessage}</p>}
      </div>
    );
  },
);

export default Input;

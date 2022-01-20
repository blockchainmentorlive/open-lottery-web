import { useState, useEffect } from "react";
import PrimaryButton from "./primary";
export { PrimaryButton };

export default function Button({
  children,
  className,
  block = false,
  disabled = false,
  ...rest
}) {
  const [clicked, setClicked] = useState(false);
  const staticClassNames = `scale-100 border rounded-sm py-2 px-6 md:py-3 md:px-10 text-sm md:text-base`;
  const disabledClassNames = `cursor-not-allowed opacity-60`;
  const animateClassNames = `transition transform duration-600 `;
  const clickedClassNames = `scale-110`;

  useEffect(() => {
    const fn = () => {
      setClicked(false);
    };
    setTimeout(fn, 500);
    return () => clearTimeout(fn);
  }, [clicked]);

  return (
    <button
      className={`${staticClassNames} ${animateClassNames} ${
        clicked ? clickedClassNames : ""
      } ${disabled ? disabledClassNames : ""} ${
        block ? "w-full" : ""
      } ${className}`}
      onClick={() => setClicked(true)}
      disabled={disabled}
      {...rest}>
      {children}
    </button>
  );
}

import { useEffect, useRef } from "react";

type DynamicHeightTextAreaProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  name?: string;
};

// Updates the height of a <textarea> when the value changes.
export function DynamicHeightTextArea({
  value,
  setValue,
  className,
  name,
}: DynamicHeightTextAreaProps) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      // We need to reset the height momentarily to get the correct scrollHeight for the textarea
      textAreaRef.current.style.height = "0px";
      const scrollHeight = textAreaRef.current.scrollHeight;

      // We then set the height directly, outside of the render loop
      // Trying to set this with state or a ref will product an incorrect value.
      textAreaRef.current.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, value]);

  return (
    <textarea
      className={className ?? ""}
      ref={textAreaRef}
      rows={1}
      value={value}
      name={name ?? ""}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

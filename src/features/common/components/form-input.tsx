import React from "react";

export default function FormInput(props: React.HTMLProps<HTMLInputElement>) {
  const { className = "", ...restProps } = props;

  return (
    <input
      className={`bg-gray-200 dark:bg-zinc-700 px-4 py-2 rounded-md ${className}`}
      {...restProps}
    />
  );
}

import React from "react";

const typeToClass: Record<string, string> = {
  primary:
    "px-4 py-2 bg-gray-700 text-white shadow-lg shadow-white-500/40 hover:brightness-150",
  secondary:
    "px-4 py-2 border-2 border-gray-800-500 bg-transparent text-gray-800 hover:brightness-150",
  icon: "p-0 ",
};

export default function Button(
  props: {
    type?: "primary" | "secondary" | "inverse" | "icon";
  } & React.HTMLProps<HTMLButtonElement>
) {
  const { type = "primary", className = "", ...restProps } = props;

  const baseClassName =
    "rounded-md cursor-pointer disabled:brightness-50 hover:disabled:cursor-not-allowed";
  const typeClassName = typeToClass[type];

  return (
    <button
      className={`${className} ${baseClassName} ${typeClassName}`}
      {...restProps}
    />
  );
}

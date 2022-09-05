import React from "react";

const typeToClass: Record<string, string> = {
  primary:
    "px-4 py-2 bg-pink-500 text-white shadow-lg shadow-pink-500/40 hover:brightness-150",
  secondary:
    "px-4 py-2 border-2 border-pink-500 bg-transparent text-pink-500 hover:brightness-150",
  iconConnect:
    "flex flex-row items-center px-4 py-2 border-0 border-lime-500 dark:border-lime-600 bg-transparent text-lime-500 dark:text-lime-600 dark:hover:bg-zinc-800 hover:bg-gray-200 text-sm space-x-2",
  iconDisconnect:
    "flex flex-row items-center px-4 py-2 border-0 border-gray-200 dark:border-stone-500 bg-transparent text-gray-500 dark:text-gray-300 dark:hover:bg-zinc-800 hover:bg-gray-200 text-sm space-x-2",
  icon:
    "flex flex-row items-center space-x-2 px-4 py-2 bg-pink-500 text-white shadow-lg shadow-pink-500/40 hover:brightness-150",
};

export default function Button(
  props: {
    type?: "primary" | "secondary" | "inverse" | "iconConnect" | "iconDisconnect" | "icon";
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

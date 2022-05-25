export default function LabeledInput(props: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col ${props.className || ""}`}>
      <label>{props.label}</label>
      <div className="text-lg">{props.children}</div>
    </div>
  );
}

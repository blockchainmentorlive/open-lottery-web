export default function TextField({
  type = "text",
  value,
  onChange = () => {},
  ...rest
}) {
  return (
    <input
      className="border-b border-b-1 px-3 py-1 text-white bg-transparent w-full"
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value) && onValidate()}
      {...rest}
    />
  );
}

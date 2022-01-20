import TextField from "../text-field";

export default function NumberField({
  value,
  integerOnly = false,
  onChange = () => {},
  min,
  max,
  ...rest
}) {
  function parse(val) {
    const numbers = val.replace(/[^0-9]/g, "");
    if (integerOnly) return numbers;
    return numbers.replace(/[^\.]/g, "").replace(/(?<=(.*\..*))\./g, "");
  }

  return (
    <TextField
      value={value}
      onChange={(val) => onChange(parse(val))}
      {...rest}
    />
  );
}

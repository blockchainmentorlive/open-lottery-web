import TextField from "../text-field";

export default function NumberField({
  value,
  integerOnly = false,
  onChange = () => {},
  ...rest
}) {
  function parse(val) {
    if (integerOnly) return val.replace(/[^0-9]/g, "");

    return val.replace(/[^0-9\.]/g, "");
  }

  return (
    <TextField
      value={value}
      onChange={(val) => onChange(parse(val))}
      {...rest}
    />
  );
}

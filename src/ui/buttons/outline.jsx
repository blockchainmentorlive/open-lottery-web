import Button from "./";

export default function OutlineButton({ children, ...rest }) {
  return (
    <Button className="text-white border border-white shadow-lg" {...rest}>
      {children}
    </Button>
  );
}

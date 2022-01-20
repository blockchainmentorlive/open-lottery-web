import Button from "./";

export default function PrimaryButton({ children, ...rest }) {
  return (
    <Button
      className="text-white bg-purple-600 border-purple-800 shadow-lg"
      {...rest}>
      {children}
    </Button>
  );
}

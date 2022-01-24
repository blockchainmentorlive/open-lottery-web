import Button from "./";

export default function PrimaryButton({ children, ...rest }) {
  return (
    <Button
      className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-green-700 rounded-md bg-opacity-70 hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      {...rest}>
      {children}
    </Button>
  );
}

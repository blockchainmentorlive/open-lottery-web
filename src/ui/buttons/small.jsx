import Button from "./";

export default function SmallButton({ children, ...rest }) {
  return (
    <Button
      className="flex items-center justify-center w-full px-1 py-1 text-xs  text-white bg-green-700 rounded-md bg-opacity-70 hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      {...rest}>
      {children}
    </Button>
  );
}

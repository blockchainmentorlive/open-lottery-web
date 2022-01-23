import Button from "./";

export default function OutlineButton({ children, ...rest }) {
  return (
    <Button
      className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      {...rest}>
      <div>{children}</div>
    </Button>
  );
}

import Container from "@/ui/container";
import Header from "./header";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="mt-32 md:px-4">
        <Container>{children}</Container>
      </div>
    </>
  );
}

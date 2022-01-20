import Authentication from "@/features/auth";

function Container({ children }) {
  return <div className="container mx-auto w-full ">{children}</div>;
}

function Header({}) {
  return (
    <header>
      <Container>
        <div className="flex py-6 px-4 items-center">
          <div className="flex-grow text-lg">
            <span className="font-bold">Open</span>
            <span className="font-light">Lottery</span>
          </div>
          <div>
            <Authentication />
          </div>
        </div>
      </Container>
    </header>
  );
}

export default function Page({ children }) {
  return (
    <>
      <Header />
      <Container>
        <div className="fpy-6 px-4">{children}</div>
      </Container>
    </>
  );
}

import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="flex w-screen min-h-screen">
      <Navbar />

      <main className="flex-1 pt-16 p-4">{children}</main>
    </div>
  );
}

export default Layout;

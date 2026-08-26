import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function SiteLayout({ children }) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
}

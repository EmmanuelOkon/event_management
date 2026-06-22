import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

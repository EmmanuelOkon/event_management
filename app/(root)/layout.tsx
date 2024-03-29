import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col">
      <Toaster richColors />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

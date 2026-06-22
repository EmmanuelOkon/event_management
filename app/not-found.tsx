import ErrorPage from "@/components/shared/ErrorPage";

export const metadata = {
  title: "Page Not Found",
  description: "This page does not exist on Evoria's Universe",
};

export default function NotFound() {
  return <ErrorPage />;
}

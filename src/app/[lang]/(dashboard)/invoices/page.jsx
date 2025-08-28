import Invoices from "@/components/Invoices";

export default async function Page({ params }) {
  const { lang } = await params;
  return (
    <>
      <Invoices />
    </>
  );
}

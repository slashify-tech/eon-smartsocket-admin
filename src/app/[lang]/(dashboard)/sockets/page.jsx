import Sockets from "@/components/Sockets";

export default async function Page({ params }) {
  const { lang } = await params;
  return (
    <>
      <Sockets />
    </>
  );
}

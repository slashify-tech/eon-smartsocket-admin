import SocketDetails from "@/components/Sockets/SocketDetailPage";

export default async function Page({ params }) {
  const { lang } = await params;
  return (
    <>
      <SocketDetails />
    </>
  );
}

import Tickets from "@/components/Ticket";

export default async function Page({ params }) {
  const { lang } = await params;
  return (
    <>
      <Tickets /> 
    </>
  );
}

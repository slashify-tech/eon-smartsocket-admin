import Sessions from "@/components/Sessions";

export default async function Page({ params }) {
  const { lang } = await params;
  return (
    <>
      <Sessions />
    </>
  );
}

import Users from "@/components/Users";

export default async function Page({ params }) {
  const { lang } = await params;
  return (
    <>
      <Users />
    </>
  );
}

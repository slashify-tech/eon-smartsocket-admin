import Admins from "@/components/Admins";

export default async function Page({ params }) {
  const { lang } = await params;
  return (
    <Admins />
  );
}

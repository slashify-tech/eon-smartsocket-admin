import Tarrif from "@/components/Tarrif";

export default async function Page({ params }) {
  const { lang } = await params;
  return (
    <Tarrif />
  );
}

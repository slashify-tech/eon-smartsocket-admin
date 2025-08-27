import Announcements from "@/components/Announcement";

export default async function Page({ params }) {
  const { lang } = await params;
  return (
    <>
      <Announcements />
    </>
  );
}

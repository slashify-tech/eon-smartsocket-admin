import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslations } from "next-intl"

// No result component
const NoAnnouncements = () => (
  <div className="flex items-center justify-center h-32">
    <p className="text-gray-400 font-bold text-lg">No Announcements</p>
  </div>
)

// Single announcement item
const AnnouncementItem = ({ title, date }) => (
  <li className="border-b pb-3 last:border-b-0">
    <p className="font-medium text-gray-800">{title}</p>
    <p className="text-sm text-gray-500 mt-1">{date}</p>
  </li>
)

// List of announcements
const AnnouncementList = ({ announcements }) => (
  <ul className="space-y-4">
    {announcements.map((item, idx) => (
      <AnnouncementItem key={idx} title={item.title} date={item.date} />
    ))}
  </ul>
)

// Main component
const Announcement = ({ announcements = [] }) => {
  const t = useTranslations()
  const isEmpty = announcements.length === 0

  return (
    <Card className="rounded-2xl shadow-sm w-full">
      <CardHeader>
        <CardTitle>{t('homeDashboard.recentAnnouncements')}</CardTitle>
      </CardHeader>
      <CardContent>
        {isEmpty ? <NoAnnouncements /> : <AnnouncementList announcements={announcements} />}

        {/* View all link */}
        <div className="flex justify-end mt-4">
          <a
            href="/announcements"
            className="text-blue-600 text-sm font-medium hover:underline"
          >
            View all →
          </a>
        </div>
      </CardContent>
    </Card>
  )
}

export default Announcement

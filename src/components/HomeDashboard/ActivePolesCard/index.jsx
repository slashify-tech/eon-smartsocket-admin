import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslations } from "next-intl"

const ActivePolesCard = ({ socketPoles }) => {
  const t = useTranslations()
  const isEmpty = !socketPoles || socketPoles.length === 0

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle>{t("homeDashboard.activeSocketPoles")}</CardTitle>
      </CardHeader>
      <CardContent>
        {isEmpty ? (
          <div className="flex items-center justify-center h-40">
            <p className="text-gray-400 font-bold text-lg">{t("common.noResults")}</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="text-left text-gray-600">
                    <th className="p-2 border-b">{t("tableHeaders.id")}</th>
                    <th className="p-2 border-b">{t("tableHeaders.location")}</th>
                    <th className="p-2 border-b">{t("tableHeaders.status")}</th>
                    <th className="p-2 border-b">{t("tableHeaders.sessionsToday")}</th>
                  </tr>
                </thead>
                <tbody>
                  {socketPoles.map((pole) => (
                    <tr key={pole.id} className="hover:bg-gray-50">
                      <td className="p-2 border-b font-medium">{pole.id}</td>
                      <td className="p-2 border-b">{pole.location}</td>
                      <td
                        className={`p-2 border-b font-medium ${
                          pole.status === "Online"
                            ? "text-green-600"
                            : pole.status === "In Session"
                            ? "text-blue-600"
                            : pole.status === "Maintenance"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {t(`status.${pole.status.replace(/\s/g, "").toLowerCase()}`)}
                      </td>
                      <td className="p-2 border-b">{pole.sessions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* View all link */}
            <div className="flex justify-end mt-4">
              <a
                href="/sockets"
                className="text-blue-600 text-sm font-medium hover:underline"
              >
                {t("common.viewAllSockets")}
              </a>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default ActivePolesCard

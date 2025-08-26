"use client";

import { Card } from "@/components/ui/card";

const statsData = [
  {
    title: "Total Active Socket",
    value: 128,
    icon: "/images/icons/socket.svg",
  },
  {
    title: "Total Users",
    value: 115,
    icon: "/images/icons/users.svg",
  },
  {
    title: "Total Sessions Today",
    value: "20/51",
    icon: "/images/icons/session.svg",
  },
  {
    title: "Total Revenue",
    value: 7920,
    icon: "/images/icons/revenue.svg",
    isCurrency: true,
  },
];

const StatsCard = () => {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
      {statsData.map((stat, index) => (
        <Card
          key={index}
          className="p-4 flex flex-row justify-around items-center rounded-2xl shadow-sm"
        >
          {/* Icon */}
          <figure className="w-[70px] h-[70px] flex items-center justify-center">
            <img
              src={stat.icon}
              alt={stat.title}
              className="w-full h-full object-contain"
            />
          </figure>

          {/* Text Content */}
          <div className="flex flex-col items-start">
            <h3 className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </h3>
            <p className="text-2xl font-semibold">
              {stat.value ? (
                stat.isCurrency ? (
                  <span className="flex items-center gap-1" dir="ltr">
                    <img src="/images/icons/SAR.svg" alt="sar" />
                    {stat.value}
                  </span>
                ) : (
                  stat.value
                )
              ) : (
                <span className="text-gray-400 font-bold text-lg">No Results</span>
              )}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default StatsCard;

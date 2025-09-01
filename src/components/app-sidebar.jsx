"use client"

import * as React from "react"
import {
  IconBuildings,
  IconClockPlay,
  IconCoins,
  IconFileInvoice,
  IconHelp,
  IconHome,
  IconLanguage,
  IconPlug,
  IconSettings,
  IconSpeakerphone,
  IconTicket,
  IconUsers,
} from "@tabler/icons-react"

// import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useTranslations } from "next-intl"
import { useParams, usePathname, useRouter } from "next/navigation"


export function AppSidebar({
  ...props
}) {
  const t = useTranslations()
  const pathname = usePathname();
  const params = useParams();
  const lang = (params?.lang) || "en";
  const newLang = lang === "en" ? "ar" : "en";
  const pathWithoutLang = pathname.replace(/^\/(en|ar)/, "");
  const newPath = `/${newLang}${pathWithoutLang}`;

  console.log('newPath', newPath);

  const handleLangToggle = () => {
    router.replace(pathname, { locale: nextLocale })
  }


  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },

navMain: [
  {
    title: t('dashboard.Dashboard'),
    url: `/${lang}`,
    icon: IconHome,
  },
  {
    title: t('dashboard.Sockets'),
    url: `/${lang}/sockets`,
    icon: IconPlug,
  },
  {
    title: t('dashboard.Admins'),
    url: `/${lang}/admins`,
    icon: IconBuildings,
  },
  {
    title: t('dashboard.UserManagement'),
    url: `/${lang}/users`,
    icon: IconUsers,
  },
  {
    title: t('dashboard.SessionManagement'),
    url: `/${lang}/sessions`,
    icon: IconClockPlay,
  },
  {
    title: t('dashboard.TicketsManagement'),
    url: `/${lang}/tickets`,
    icon: IconTicket,
  },
  {
    title: t('dashboard.TarrifManagement'),
    url: `/${lang}/tariffs`,
    icon: IconCoins,
  },
  {
    title: t('dashboard.Announcement'),
    url: `/${lang}/announcements`,
    icon: IconSpeakerphone,
  },
  {
    title: t('dashboard.Invoices'),
    url: `/${lang}/invoices`,
    icon: IconFileInvoice,
  },
],
    // navClouds: [
    //   {
    //     title: "Capture",
    //     icon: IconCamera,
    //     isActive: true,
    //     url: "#",
    //     items: [
    //       {
    //         title: "Active Proposals",
    //         url: "#",
    //       },
    //       {
    //         title: "Archived",
    //         url: "#",
    //       },
    //     ],
    //   },
    //   {
    //     title: "Proposal",
    //     icon: IconFileDescription,
    //     url: "#",
    //     items: [
    //       {
    //         title: "Active Proposals",
    //         url: "#",
    //       },
    //       {
    //         title: "Archived",
    //         url: "#",
    //       },
    //     ],
    //   },
    //   {
    //     title: "Prompts",
    //     icon: IconFileAi,
    //     url: "#",
    //     items: [
    //       {
    //         title: "Active Proposals",
    //         url: "#",
    //       },
    //       {
    //         title: "Archived",
    //         url: "#",
    //       },
    //     ],
    //   },
    // ],

    navSecondary: [
      {
        title: "Settings",
        url: "#",
        icon: IconSettings,
      },
      {
        title: "Get Help",
        url: "#",
        icon: IconHelp,
      },
      {
        title: t("common.langToggle"),
        url: `${newPath}${window != undefined ? window.location.search : ''}`,
        icon: IconLanguage,
      },
    ],

    // documents: [
    //   {
    //     name: "Data Library",
    //     url: "#",
    //     icon: IconDatabase,
    //   },
    //   {
    //     name: "Reports",
    //     url: "#",
    //     icon: IconReport,
    //   },
    //   {
    //     name: "Word Assistant",
    //     url: "#",
    //     icon: IconFileWord,
    //   },
    // ],
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-4 !h-auto"
            >
              <a href="/" className="flex flex-col items-center">
                <figure className="h-32 w-32 rounded-lg shadow-sm flex items-center justify-center">
                  <img
                    src="/images/logo.svg"
                    alt="Raam 4 Wheelers Logo"
                    className="w-full h-full object-contain"
                  />
                </figure>
                <div className="text-center">
                  <span className="text-lg font-semibold block">
                    Energy On
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}

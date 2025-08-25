"use client"

import * as React from "react"
import {
  IconBuildings,
  IconChartBar,
  IconClockPlay,
  IconCoins,
  IconDashboard,
  IconFileInvoice,
  IconFolder,
  IconHelp,
  IconHome,
  IconInnerShadowTop,
  IconLanguage,
  IconListDetails,
  IconPlug,
  IconSearch,
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
        title: "Dashboard",
        url: `/${lang}`,
        icon: IconHome,
      },
      {
        title: "Sockets",
        url: "#",
        icon: IconPlug,
      },
      {
        title: "Admins",
        url: "#",
        icon: IconBuildings,
      },
      {
        title: "User Management",
        url: "#",
        icon: IconUsers,
      },
      {
        title: "Session Management",
        url: "#",
        icon: IconClockPlay,
      },
      {
        title: "Tickets Management",
        url: "#",
        icon: IconTicket,
      },
      {
        title: "Tarrif Management",
        url: "#",
        icon: IconCoins,
      },
      {
        title: "Announcement",
        url: "#",
        icon: IconSpeakerphone,
      },
      {
        title: "Invoices",
        url: "#",
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
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="/">
                {/* <IconInnerShadowTop className="!size-5" /> */}
                {/* <span className=""> */}
                  <figure>
                    {/* <img src="/images/logo.svg"/> */}
                  </figure>
                {/* </span> */}
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

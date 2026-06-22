"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type ProfileTabsProps = {
  defaultTab?: "organizing" | "tickets";
  organizingContent: ReactNode;
  ticketsContent: ReactNode;
};

const ProfileTabs = ({
  defaultTab = "organizing",
  organizingContent,
  ticketsContent,
}: ProfileTabsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab =
    searchParams.get("tab") === "tickets" ? "tickets" : defaultTab;

  const handleTabChange = (value: string) => {
    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.set("tab", value);
    router.push(`${pathname}?${nextParams.toString()}`, { scroll: false });
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="h-auto w-fit justify-start gap-2 rounded-none border border-border bg-transparent p-1">
        <TabsTrigger
          value="organizing"
          className="rounded-none border border-transparent px-5 py-2 cursor-pointer"
        >
          Organizing
        </TabsTrigger>
        <TabsTrigger
          value="tickets"
          className="rounded-none border border-transparent px-5 py-2  cursor-pointer"
        >
          My Tickets
        </TabsTrigger>
      </TabsList>

      <TabsContent value="organizing" className="mt-8">
        {organizingContent}
      </TabsContent>

      <TabsContent value="tickets" className="mt-8">
        {ticketsContent}
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;

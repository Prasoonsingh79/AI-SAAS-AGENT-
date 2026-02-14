"use client";
import { cn } from "@/lib/utils";
import { BotIcon, StarIcon, VideoIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DashboardUserButton } from "./DashboardUserButton";

const firstSection = [
  { icon: VideoIcon, label: "Meeting", href: "/meetings" },
  { icon: BotIcon, label: "Agents", href: "/agents" },
];

const secondSection = [
  { icon: StarIcon, label: "Upgrade", href: "/upgrade" },
];

export const DashboardSidebar = () => {
  const pathname = usePathname();
  return (
    <div className="flex h-screen w-64 flex-col bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] border-r border-gray-800 shadow-lg fixed left-0 top-0">
      {/* Sidebar Header */}
      <div className="flex items-center gap-3 px-4 py-5">
        <Image
          src="/logp.jpg"
          height={40}
          width={40}
          alt="logo"
          className="rounded-lg shadow-md"
        />
        <p className="text-lg font-semibold tracking-wide text-white">Apex-Agents</p>
      </div>

      {/* Divider */}
      <div className="mx-4 mb-4 border-t border-gray-700 opacity-30" />

      {/* Main Navigation */}
      <div className="flex-1 overflow-auto px-2 space-y-6">
        {/* First Section */}
        <nav className="space-y-2">
          {firstSection.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-300 transition-all duration-300 ease-out hover:scale-[1.02]",
                  "hover:bg-gradient-to-r hover:from-red-500/20 hover:via-red-500/10 hover:to-transparent hover:text-white",
                  isActive &&
                  "bg-gradient-to-r from-red-500/30 via-red-500/10 to-transparent text-white shadow-inner"
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Second Section */}
        <div>
          <div className="mb-3 border-t border-gray-700 opacity-30" />
          <nav className="space-y-2">
            {secondSection.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-300 transition-all duration-300 ease-out hover:scale-[1.02]",
                    "hover:bg-gradient-to-r hover:from-yellow-400/20 hover:via-yellow-400/10 hover:to-transparent hover:text-white",
                    isActive &&
                    "bg-gradient-to-r from-yellow-400/30 via-yellow-400/10 to-transparent text-white shadow-inner"
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-700 bg-black/20 px-4 py-4 text-center mt-auto">
        <DashboardUserButton />

      </footer>
    </div>
  );
};
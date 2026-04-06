"use client";
import { cn } from "@/lib/utils";
import { BotIcon, StarIcon, VideoIcon, HomeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DashboardUserButton } from "./DashboardUserButton";

const firstSection = [
  { icon: HomeIcon, label: "Dashboard", href: "/" },
  { icon: VideoIcon, label: "Meeting", href: "/meetings" },
  { icon: BotIcon, label: "Agents", href: "/agents" },
];

const secondSection = [
  { icon: StarIcon, label: "Upgrade", href: "/upgrade" },
];

export const DashboardSidebar = () => {
  const pathname = usePathname();
  return (
    <div className="flex h-screen w-64 flex-col bg-gradient-to-b from-[#1e1e2e] via-[#1a1a28] to-[#181825] border-r border-[#45475a] shadow-xl fixed left-0 top-0">
      {/* Sidebar Header */}
      <div className="flex items-center gap-3 px-5 py-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl blur-md opacity-40" />
          <Image
            src="/logp.jpg"
            height={40}
            width={40}
            alt="logo"
            className="relative rounded-xl shadow-lg"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-lg font-bold tracking-wide text-[#cdd6f4]">Apex</p>
          <p className="text-xs text-[#6c7086] -mt-1">Agents</p>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-5 mb-4 h-px bg-gradient-to-r from-transparent via-[#45475a] to-transparent" />

      {/* Main Navigation */}
      <div className="flex-1 overflow-auto px-3 space-y-6">
        {/* First Section */}
        <nav className="space-y-1">
          <p className="px-3 text-xs font-medium text-[#6c7086] uppercase tracking-wider mb-2">Menu</p>
          {firstSection.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-[#89b4fa] border border-blue-500/30 shadow-lg shadow-blue-500/10"
                    : "text-[#a6adc8] hover:bg-[#45475a]/50 hover:text-[#cdd6f4]"
                )}
              >
                <item.icon className={cn("h-5 w-5 flex-shrink-0", isActive ? "text-[#89b4fa]" : "text-[#6c7086]")} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Second Section */}
        <div>
          <div className="mx-3 mb-3 h-px bg-gradient-to-r from-transparent via-[#45475a] to-transparent" />
          <p className="px-3 text-xs font-medium text-[#6c7086] uppercase tracking-wider mb-2">Settings</p>
          <nav className="space-y-1">
            {secondSection.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-[#f9e2af] border border-yellow-500/30 shadow-lg shadow-yellow-500/10"
                      : "text-[#a6adc8] hover:bg-[#45475a]/50 hover:text-[#cdd6f4]"
                  )}
                >
                  <item.icon className={cn("h-5 w-5 flex-shrink-0", isActive ? "text-[#f9e2af]" : "text-[#6c7086]")} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#45475a] bg-[#181825]/50 px-4 py-4 mt-auto">
        <DashboardUserButton />
      </footer>
    </div>
  );
};

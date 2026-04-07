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
    <div className="flex h-screen w-64 flex-col bg-gradient-to-b from-[#e0f2fe] via-[#d0e8fd] to-[#bad9fb] border-r border-[#93c5fd] shadow-lg fixed left-0 top-0">
      {/* Sidebar Header */}
      <div className="flex items-center gap-3 px-5 py-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl blur-md opacity-30" />
          <Image
            src="/logp.jpg"
            height={40}
            width={40}
            alt="logo"
            className="relative rounded-xl shadow-md"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-lg font-bold tracking-wide text-[#1e40af]">Apex</p>
          <p className="text-xs text-[#3b82f6] -mt-1">Agents</p>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-5 mb-4 h-px bg-gradient-to-r from-transparent via-[#93c5fd] to-transparent" />

      {/* Main Navigation */}
      <div className="flex-1 overflow-auto px-3 space-y-6">
        {/* First Section */}
        <nav className="space-y-1">
          <p className="px-3 text-xs font-medium text-[#64748b] uppercase tracking-wider mb-2">Menu</p>
          {firstSection.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 border border-blue-200 shadow-sm"
                    : "text-[#475569] hover:bg-blue-50 hover:text-blue-700"
                )}
              >
                <item.icon className={cn("h-5 w-5 flex-shrink-0", isActive ? "text-blue-500" : "text-[#64748b]")} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Second Section */}
        <div>
          <div className="mx-3 mb-3 h-px bg-gradient-to-r from-transparent via-[#93c5fd] to-transparent" />
          <p className="px-3 text-xs font-medium text-[#64748b] uppercase tracking-wider mb-2">Settings</p>
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
                      ? "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border border-purple-200 shadow-sm"
                      : "text-[#475569] hover:bg-purple-50 hover:text-purple-700"
                  )}
                >
                  <item.icon className={cn("h-5 w-5 flex-shrink-0", isActive ? "text-purple-500" : "text-[#64748b]")} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#93c5fd] bg-[#d0e8fd]/50 px-4 py-4 mt-auto">
        <DashboardUserButton />
      </footer>
    </div>
  );
};

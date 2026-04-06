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
    <div className="flex h-screen w-64 flex-col bg-gradient-to-b from-white via-slate-50 to-slate-100 border-r border-slate-200 shadow-lg fixed left-0 top-0">
      {/* Sidebar Header */}
      <div className="flex items-center gap-3 px-5 py-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl blur-md opacity-30" />
          <Image
            src="/logp.jpg"
            height={40}
            width={40}
            alt="logo"
            className="relative rounded-xl shadow-md"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-lg font-bold tracking-wide text-slate-800">Apex</p>
          <p className="text-xs text-slate-500 -mt-1">Agents</p>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-5 mb-4 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

      {/* Main Navigation */}
      <div className="flex-1 overflow-auto px-3 space-y-6">
        {/* First Section */}
        <nav className="space-y-1">
          <p className="px-3 text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Menu</p>
          {firstSection.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200 shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
                )}
              >
                <item.icon className={cn("h-5 w-5 flex-shrink-0", isActive ? "text-blue-500" : "text-slate-400")} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Second Section */}
        <div>
          <div className="mx-3 mb-3 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
          <p className="px-3 text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Settings</p>
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
                      ? "bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 border border-amber-200 shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
                  )}
                >
                  <item.icon className={cn("h-5 w-5 flex-shrink-0", isActive ? "text-amber-500" : "text-slate-400")} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50 px-4 py-4 mt-auto">
        <DashboardUserButton />
      </footer>
    </div>
  );
};

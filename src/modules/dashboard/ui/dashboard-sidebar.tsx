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
    <div className="flex h-screen w-64 flex-col bg-gradient-to-b from-[#0f0f17] via-[#0a0a0f] to-[#050507] border-r border-white/5 shadow-2xl fixed left-0 top-0">
      {/* Sidebar Header */}
      <div className="flex items-center gap-3 px-5 py-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl blur-md opacity-50" />
          <Image
            src="/logp.jpg"
            height={40}
            width={40}
            alt="logo"
            className="relative rounded-xl shadow-lg"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-lg font-bold tracking-wide text-white">Apex</p>
          <p className="text-xs text-zinc-500 -mt-1">Agents</p>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-5 mb-4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Main Navigation */}
      <div className="flex-1 overflow-auto px-3 space-y-6">
        {/* First Section */}
        <nav className="space-y-1">
          <p className="px-3 text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Menu</p>
          {firstSection.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/10 text-white border border-indigo-500/30 shadow-lg shadow-indigo-500/10"
                    : "text-zinc-400 hover:bg-white/5 hover:text-white hover:translate-x-0.5"
                )}
              >
                <item.icon className={cn("h-5 w-5 flex-shrink-0", isActive ? "text-indigo-400" : "text-zinc-500")} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Second Section */}
        <div>
          <div className="mx-3 mb-3 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <p className="px-3 text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Settings</p>
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
                      ? "bg-gradient-to-r from-amber-500/20 to-orange-500/10 text-white border border-amber-500/30 shadow-lg shadow-amber-500/10"
                      : "text-zinc-400 hover:bg-white/5 hover:text-white hover:translate-x-0.5"
                  )}
                >
                  <item.icon className={cn("h-5 w-5 flex-shrink-0", isActive ? "text-amber-400" : "text-zinc-500")} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black/20 px-4 py-4 mt-auto">
        <DashboardUserButton />
      </footer>
    </div>
  );
};

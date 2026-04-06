"use client";

import { Button } from "@/components/ui/button";
import { SearchIcon, BellIcon, PlusIcon } from "lucide-react";
import { DashboardCommand } from "./dashboard-command";
import { useState, useEffect } from "react";

export const DashboardNavbar = () => {
  const [commandOpen, setCammandOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCammandOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <DashboardCommand open={commandOpen} setOpen={setCammandOpen} />
      <nav className="flex items-center justify-between px-6 py-3 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-xl">
        <div className="flex items-center gap-x-3">
          <Button
            className="h-10 w-[260px] justify-start font-normal text-zinc-400 bg-white/5 hover:bg-white/10 hover:text-white border border-white/5 transition-all duration-200"
            variant="outline"
            size="sm"
            onClick={() => setCammandOpen((open) => !open)}
          >
            <SearchIcon className="h-4 w-4 mr-2 text-zinc-500" />
            <span className="text-zinc-500">Search...</span>
            <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-zinc-500">
              <span className="text-xs">⌘K</span>
            </kbd>
          </Button>
        </div>
        
        <div className="flex items-center gap-x-3">
          <Button
            variant="ghost"
            size="icon"
            className="text-zinc-400 hover:text-white hover:bg-white/5 relative"
          >
            <BellIcon className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-indigo-500 rounded-full" />
          </Button>
          <Button
            className="h-9 px-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-medium rounded-xl shadow-lg shadow-indigo-500/20 transition-all duration-200 hover:scale-[1.02]"
          >
            <PlusIcon className="h-4 w-4 mr-1.5" />
            New Meeting
          </Button>
        </div>
      </nav>
    </>
  );
};

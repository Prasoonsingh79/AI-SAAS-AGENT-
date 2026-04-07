"use client";

import { Button } from "@/components/ui/button";
import { SearchIcon, BellIcon, XIcon } from "lucide-react";
import { DashboardCommand } from "./dashboard-command";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

export const DashboardNavbar = () => {
  const [commandOpen, setCammandOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { data: notifications, isLoading } = useQuery({
    ...trpc.notifications.getMany.queryOptions({ input: { limit: 10 } }),
    enabled: notificationsOpen,
  });

  const { data: unreadCount } = useQuery({
    ...trpc.notifications.getUnreadCount.queryOptions(),
  });

  const markAsRead = useMutation({
    ...trpc.notifications.markAsRead.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: trpc.notifications.getUnreadCount.queryKey });
        queryClient.invalidateQueries({ queryKey: trpc.notifications.getMany.queryKey });
      },
    }),
  });

  const markAllAsRead = useMutation({
    ...trpc.notifications.markAllAsRead.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: trpc.notifications.getUnreadCount.queryKey });
        queryClient.invalidateQueries({ queryKey: trpc.notifications.getMany.queryKey });
      },
    }),
  });

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

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "meeting_reminder": return "🔔";
      case "meeting_started": return "🎥";
      case "meeting_ended": return "✅";
      case "meeting_cancelled": return "❌";
      case "summary_ready": return "📝";
      default: return "📢";
    }
  };

  const getNotificationLink = (type: string, meetingId?: string) => {
    if (!meetingId) return "#";
    return `/meetings/${meetingId}`;
  };

  return (
    <>
      <DashboardCommand open={commandOpen} setOpen={setCammandOpen} />
      <nav className="flex items-center justify-between px-6 py-3 border-b border-[#b8e8ce] bg-white/70 backdrop-blur-xl relative">
        <div className="flex items-center gap-x-3">
          <Button
            className="h-10 w-[260px] justify-start font-normal text-[#5a7a6a] bg-[#e8f5ef] hover:bg-[#d4f0e1] hover:text-[#1a3d2e] border border-[#b8e8ce] transition-all duration-200"
            variant="outline"
            size="sm"
            onClick={() => setCammandOpen((open) => !open)}
          >
            <SearchIcon className="h-4 w-4 mr-2 text-[#5a7a6a]" />
            <span className="text-[#5a7a6a]">Search...</span>
            <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-[#b8e8ce] bg-white px-1.5 font-mono text-[10px] font-medium text-[#5a7a6a]">
              <span className="text-xs">⌘K</span>
            </kbd>
          </Button>
        </div>
        
        <div className="flex items-center gap-x-3 relative">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="text-[#5a7a6a] hover:text-[#1a3d2e] hover:bg-green-100 relative"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
            >
              <BellIcon className="h-5 w-5" />
              {unreadCount?.count ? (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-green-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center">
                  {unreadCount.count > 9 ? "9+" : unreadCount.count}
                </span>
              ) : null}
            </Button>

            {notificationsOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-[#b8e8ce] rounded-xl shadow-xl shadow-green-100/50 z-50 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-[#e8f5ef]">
                  <h3 className="font-semibold text-[#1a3d2e]">Notifications</h3>
                  <div className="flex items-center gap-2">
                    {unreadCount?.count ? (
                      <button onClick={() => markAllAsRead.mutate()} className="text-xs text-green-600 hover:text-green-700">
                        Mark all read
                      </button>
                    ) : null}
                    <button onClick={() => setNotificationsOpen(false)} className="text-[#5a7a6a] hover:text-[#1a3d2e]">
                      <XIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {isLoading ? (
                    <div className="p-4 text-center text-[#5a7a6a]">Loading...</div>
                  ) : notifications?.length === 0 ? (
                    <div className="p-4 text-center text-[#5a7a6a]">
                      <BellIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No notifications yet</p>
                    </div>
                  ) : (
                    notifications?.map((notification) => (
                      <a
                        key={notification.id}
                        href={getNotificationLink(notification.type, notification.meetingId)}
                        className={cn(
                          "block px-4 py-3 hover:bg-green-50 transition-colors border-b border-[#e8f5ef] last:border-0",
                          !notification.read && "bg-green-50/50"
                        )}
                        onClick={() => {
                          if (!notification.read) markAsRead.mutate({ id: notification.id });
                          setNotificationsOpen(false);
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                          <div className="flex-1 min-w-0">
                            <p className={cn("text-sm font-medium truncate", notification.read ? "text-[#5a7a6a]" : "text-[#1a3d2e]")}>
                              {notification.title}
                            </p>
                            <p className="text-xs text-[#7a9a8a] line-clamp-2 mt-0.5">{notification.message}</p>
                            <p className="text-xs text-[#a0baba] mt-1">
                              {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                            </p>
                          </div>
                          {!notification.read && <div className="h-2 w-2 bg-green-500 rounded-full mt-1.5" />}
                        </div>
                      </a>
                    ))
                  )}
                </div>

                <a href="/notifications" className="block px-4 py-3 text-center text-sm text-green-600 hover:text-green-700 border-t border-[#e8f5ef] hover:bg-green-50 transition-colors">
                  View all notifications
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

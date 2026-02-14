"use client";

import { useQuery } from "@tanstack/react-query";
import { LoaderIcon, SparklesIcon, Users, Calendar, Activity } from "lucide-react"; // Added Icons
import { authClient } from "@/lib/auth-client";
import { useTRPC } from "@/trpc/client"; // Import TRPC client
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Import Card components

export function HomeView() {
  const { data: session, isPending } = authClient.useSession();
  const trpc = useTRPC();

  // Fetch Stats Data
  const { data: agentsCount } = useQuery({
    ...trpc.agents.getCount.queryOptions(),
    enabled: !!session?.user,
  });

  const { data: meetingStats } = useQuery({
    ...trpc.meetings.getStats.queryOptions(),
    enabled: !!session?.user,
  });

  const displayedAgentsCount = agentsCount || 0;
  const displayedMeetingStats = meetingStats || { totalConfigured: 0, upcomingCount: 0 };

  if (isPending) {
    return (
      <div className="flex h-full items-center justify-center bg-black">
        <LoaderIcon className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const userName = session?.user?.name || "Prasoon"; // Fallback name

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center pt-20 overflow-hidden bg-slate-950 px-4 text-center">

      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 h-[400px] w-[400px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-6 max-w-4xl w-full animate-in fade-in slide-in-from-bottom-4 duration-1000">

        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium text-white/70 backdrop-blur-xl">
          <SparklesIcon className="mr-2 size-3.5 text-purple-400" />
          <span>Next Generation AI Workspace</span>
        </div>

        <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl">
          <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 pb-4">
            Welcome back,
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">
            {userName}
          </span>
        </h1>

        <p className="mt-4 text-lg text-white/50 md:text-xl max-w-2xl leading-relaxed mb-8">
          Your intelligent command center is ready. Manage your agents, analyze meetings, and unlock insights with the power of AI.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
          {/* Total Agents Card */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-slate-200">Total Agents</CardTitle>
              <Users className="h-4 w-4 text-indigo-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{displayedAgentsCount}</div>
              <p className="text-xs text-slate-400">Active AI Assistants</p>
            </CardContent>
          </Card>

          {/* Total Meetings Card */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-slate-200">Total Meetings</CardTitle>
              <Activity className="h-4 w-4 text-pink-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{displayedMeetingStats.totalConfigured}</div>
              <p className="text-xs text-slate-400">All time sessions</p>
            </CardContent>
          </Card>

          {/* Upcoming Meetings Card */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-slate-200">Upcoming Meetings</CardTitle>
              <Calendar className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{displayedMeetingStats.upcomingCount}</div>
              <p className="text-xs text-slate-400">Scheduled for later</p>
            </CardContent>
          </Card>
        </div>

        {/* Subtle divider */}
        <div className="mt-12 h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      </div>
    </div>
  );
}
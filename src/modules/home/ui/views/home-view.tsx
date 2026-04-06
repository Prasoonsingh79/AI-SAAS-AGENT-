"use client";

import { useQuery } from "@tanstack/react-query";
import { LoaderIcon, SparklesIcon, Users, Calendar, Activity, Clock, Zap } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useTRPC } from "@/trpc/client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export function HomeView() {
  const { data: session, isPending } = authClient.useSession();
  const trpc = useTRPC();

  const { data: agentsCount } = useQuery({
    ...trpc.agents.getCount.queryOptions(),
    enabled: !!session?.user,
  });

  const { data: meetingStats } = useQuery({
    ...trpc.meetings.getStats.queryOptions(),
    enabled: !!session?.user,
  });

  const { data: analyticsData } = useQuery({
    ...trpc.meetings.getAnalytics.queryOptions(),
    enabled: !!session?.user,
  });

  if (isPending || !analyticsData || !meetingStats) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#1e1e2e] via-[#252535] to-[#1e1e2e]">
        <div className="flex flex-col items-center gap-4">
          <LoaderIcon className="size-8 animate-spin text-[#89b4fa]" />
          <p className="text-[#6c7086] text-sm font-medium animate-pulse">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  const userName = session?.user?.name || "Prasoon";
  const displayedAgentsCount = agentsCount || 0;

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    if (minutes < 1) return "< 1m";
    return `${minutes}m`;
  };

  const chartData = Object.entries(analyticsData.talkTimePerUser).map(([name, time]) => ({
    name,
    talkTime: Math.floor((time as number) / 60)
  }));

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full bg-transparent text-[#cdd6f4] p-6 md:p-8 font-sans">
      {/* Background Effects */}
      <div className="fixed top-0 left-0 w-[600px] h-[600px] rounded-full bg-[#89b4fa]/10 blur-[200px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#cba6f7]/10 blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-8">
        
        {/* Header */}
        <header className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out py-2">
           <div className="flex items-center gap-2">
             <div className="inline-flex items-center rounded-full border border-[#89b4fa]/30 bg-[#89b4fa]/10 px-3 py-1 text-xs font-semibold text-[#89b4fa]">
               <SparklesIcon className="mr-2 size-3.5" /> AI-Powered Workspace
             </div>
           </div>
           <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#cdd6f4]">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#89b4fa] via-[#cba6f7] to-[#f38ba8]">{userName}</span>
           </h1>
           <p className="text-[#a6adc8] text-lg max-w-2xl">
             Your intelligent command center. Monitor your meetings and AI agent performance in real-time.
           </p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="group relative overflow-hidden rounded-2xl border border-[#45475a] bg-[#313244] p-5 transition-all hover:border-[#89b4fa]/30 hover:bg-[#383850] hover:shadow-lg hover:shadow-[#89b4fa]/10">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-[#a6adc8]">Total Agents</h3>
              <div className="rounded-xl bg-[#89b4fa]/20 p-2.5 text-[#89b4fa] group-hover:scale-110 transition-transform">
                 <Users className="size-4" />
              </div>
            </div>
            <p className="text-3xl font-bold text-[#cdd6f4] mb-1">{displayedAgentsCount}</p>
            <p className="text-xs text-[#6c7086]">Active AI Assistants</p>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-[#45475a] bg-[#313244] p-5 transition-all hover:border-[#f38ba8]/30 hover:bg-[#383850] hover:shadow-lg hover:shadow-[#f38ba8]/10">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-[#a6adc8]">Total Meetings</h3>
              <div className="rounded-xl bg-[#f38ba8]/20 p-2.5 text-[#f38ba8] group-hover:scale-110 transition-transform">
                 <Activity className="size-4" />
              </div>
            </div>
            <p className="text-3xl font-bold text-[#cdd6f4] mb-1">{meetingStats.totalConfigured}</p>
            <p className="text-xs text-[#6c7086]">All time sessions</p>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-[#45475a] bg-[#313244] p-5 transition-all hover:border-[#a6e3a1]/30 hover:bg-[#383850] hover:shadow-lg hover:shadow-[#a6e3a1]/10">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-[#a6adc8]">Avg Duration</h3>
              <div className="rounded-xl bg-[#a6e3a1]/20 p-2.5 text-[#a6e3a1] group-hover:scale-110 transition-transform">
                 <Clock className="size-4" />
              </div>
            </div>
            <p className="text-3xl font-bold text-[#cdd6f4] mb-1">{formatDuration(analyticsData.averageDuration)}</p>
            <p className="text-xs text-[#6c7086]">Per summarized meeting</p>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-[#45475a] bg-[#313244] p-5 transition-all hover:border-[#f9e2af]/30 hover:bg-[#383850] hover:shadow-lg hover:shadow-[#f9e2af]/10">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-[#a6adc8]">Upcoming</h3>
              <div className="rounded-xl bg-[#f9e2af]/20 p-2.5 text-[#f9e2af] group-hover:scale-110 transition-transform">
                 <Calendar className="size-4" />
              </div>
            </div>
            <p className="text-3xl font-bold text-[#cdd6f4] mb-1">{meetingStats.upcomingCount}</p>
            <p className="text-xs text-[#6c7086]">Scheduled sessions</p>
          </div>

        </div>

        {/* Analytics Chart */}
        <div className="rounded-2xl border border-[#45475a] bg-[#313244]/50 backdrop-blur-2xl overflow-hidden flex flex-col min-h-[400px]">
          <div className="flex items-center justify-between border-b border-[#45475a] px-6 py-5 bg-[#313244]/80">
            <h2 className="text-lg font-semibold text-[#cdd6f4] flex items-center gap-3">
              <span className="flex items-center justify-center rounded-xl bg-[#89b4fa]/20 p-2 text-[#89b4fa]">
                <Zap className="size-4" />
              </span>
              AI Insights & Talk Time <span className="text-sm font-normal text-[#6c7086] ml-2">(Minutes)</span>
            </h2>
          </div>
          <div className="flex-1 p-6 flex flex-col justify-center">
            {chartData.length > 0 ? (
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
                    <XAxis dataKey="name" stroke="#6c7086" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                    <YAxis stroke="#6c7086" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}m`} dx={-10} />
                    <Tooltip 
                      cursor={{fill: 'rgba(137, 180, 250, 0.05)'}}
                      contentStyle={{ backgroundColor: '#313244', border: '1px solid #45475a', borderRadius: '12px', color: '#cdd6f4' }}
                      itemStyle={{ color: '#89b4fa', fontWeight: 'bold' }}
                    />
                    <Bar dataKey="talkTime" fill="url(#colorTalkTimeMid)" radius={[6, 6, 0, 0]} barSize={40} animationDuration={1500} />
                    <defs>
                      <linearGradient id="colorTalkTimeMid" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#89b4fa" stopOpacity={1}/>
                        <stop offset="100%" stopColor="#6366f1" stopOpacity={0.8}/>
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex flex-col h-[200px] items-center justify-center text-[#6c7086] gap-4">
                 <div className="rounded-full bg-[#45475a]/30 p-4">
                    <Activity className="size-8 text-[#585b70]" />
                 </div>
                 <p className="text-sm font-medium">No meeting data recorded yet.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

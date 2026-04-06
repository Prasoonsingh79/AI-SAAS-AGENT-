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
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full blur-xl animate-pulse" />
          </div>
          <LoaderIcon className="size-8 animate-spin text-indigo-500" />
          <p className="text-slate-400 text-sm font-medium animate-pulse">Loading your workspace...</p>
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
    <div className="min-h-[calc(100vh-4rem)] w-full bg-transparent text-slate-100 p-6 md:p-8 font-sans">
      
      {/* Background Decorative Effects */}
      <div className="fixed top-0 left-0 w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-[200px] pointer-events-none -translate-x-1/3 -translate-y-1/3" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[180px] pointer-events-none translate-x-1/3 translate-y-1/3" />
      <div className="fixed top-1/2 left-1/2 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[150px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-8">
        
        {/* Header */}
        <header className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out py-2">
           <div className="flex items-center gap-2">
             <div className="inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300 backdrop-blur-sm">
               <SparklesIcon className="mr-2 size-3.5" /> AI-Powered Workspace
             </div>
           </div>
           <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">{userName}</span>
           </h1>
           <p className="text-slate-400 text-lg max-w-2xl">
             Your intelligent command center. Monitor your meetings and AI agent performance in real-time.
           </p>
        </header>

        {/* Global Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 ease-out fill-mode-both">
          
          <div className="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/50 p-5 backdrop-blur-xl transition-all hover:border-indigo-500/30 hover:bg-slate-800 hover:shadow-lg hover:shadow-indigo-500/10">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-slate-400">Total Agents</h3>
              <div className="rounded-xl bg-indigo-500/20 p-2.5 text-indigo-400 group-hover:scale-110 transition-transform">
                 <Users className="size-4" />
              </div>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{displayedAgentsCount}</p>
            <p className="text-xs text-slate-500">Active AI Assistants</p>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/50 p-5 backdrop-blur-xl transition-all hover:border-pink-500/30 hover:bg-slate-800 hover:shadow-lg hover:shadow-pink-500/10">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-slate-400">Total Meetings</h3>
              <div className="rounded-xl bg-pink-500/20 p-2.5 text-pink-400 group-hover:scale-110 transition-transform">
                 <Activity className="size-4" />
              </div>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{meetingStats.totalConfigured}</p>
            <p className="text-xs text-slate-500">All time sessions</p>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/50 p-5 backdrop-blur-xl transition-all hover:border-blue-500/30 hover:bg-slate-800 hover:shadow-lg hover:shadow-blue-500/10">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-slate-400">Avg Duration</h3>
              <div className="rounded-xl bg-blue-500/20 p-2.5 text-blue-400 group-hover:scale-110 transition-transform">
                 <Clock className="size-4" />
              </div>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{formatDuration(analyticsData.averageDuration)}</p>
            <p className="text-xs text-slate-500">Per summarized meeting</p>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/50 p-5 backdrop-blur-xl transition-all hover:border-emerald-500/30 hover:bg-slate-800 hover:shadow-lg hover:shadow-emerald-500/10">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-slate-400">Upcoming</h3>
              <div className="rounded-xl bg-emerald-500/20 p-2.5 text-emerald-400 group-hover:scale-110 transition-transform">
                 <Calendar className="size-4" />
              </div>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{meetingStats.upcomingCount}</p>
            <p className="text-xs text-slate-500">Scheduled sessions</p>
          </div>

        </div>

        {/* Analytics Chart */}
        <div className="rounded-2xl border border-slate-700/50 bg-slate-800/30 backdrop-blur-2xl overflow-hidden flex flex-col min-h-[400px] animate-in fade-in slide-in-from-bottom-12 duration-700 delay-200 ease-out fill-mode-both">
          <div className="flex items-center justify-between border-b border-slate-700/50 px-6 py-5 bg-slate-800/50">
            <h2 className="text-lg font-semibold text-white flex items-center gap-3">
              <span className="flex items-center justify-center rounded-xl bg-indigo-500/20 p-2 text-indigo-400">
                <Zap className="size-4" />
              </span>
              AI Insights & Talk Time <span className="text-sm font-normal text-slate-400 ml-2">(Minutes)</span>
            </h2>
          </div>
          <div className="flex-1 p-6 flex flex-col justify-center">
            {chartData.length > 0 ? (
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
                    <XAxis 
                       dataKey="name" 
                       stroke="#64748b" 
                       fontSize={12} 
                       tickLine={false} 
                       axisLine={false} 
                       dy={10}
                    />
                    <YAxis 
                       stroke="#64748b" 
                       fontSize={12} 
                       tickLine={false} 
                       axisLine={false} 
                       tickFormatter={(val) => `${val}m`} 
                       dx={-10}
                    />
                    <Tooltip 
                      cursor={{fill: 'rgba(99, 102, 241, 0.05)'}}
                      contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)' }}
                      itemStyle={{ color: '#818cf8', fontWeight: 'bold' }}
                    />
                    <Bar 
                       dataKey="talkTime" 
                       fill="url(#colorTalkTime)" 
                       radius={[6, 6, 0, 0]} 
                       barSize={40}
                       animationDuration={1500}
                    />
                    <defs>
                      <linearGradient id="colorTalkTime" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#818cf8" stopOpacity={1}/>
                        <stop offset="100%" stopColor="#6366f1" stopOpacity={0.8}/>
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex flex-col h-[200px] items-center justify-center text-slate-500 gap-4">
                 <div className="rounded-full bg-slate-700/30 p-4">
                    <Activity className="size-8 text-slate-600 opacity-50" />
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

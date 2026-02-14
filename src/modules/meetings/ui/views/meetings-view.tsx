"use client"

import { ErrorState } from "@/components/error-state"
import { LoadingState } from "@/components/loading-state"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import { ColumnDef } from "@tanstack/react-table"
import { Plus, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { GeneratedAvatar } from "@/components/generated-avatar"
import { useMeetingsFilter } from "@/modules/meetings/hooks/use-meetings-filter"

import type { MeetingGetMany } from "@/modules/meetings/types"

interface MeetingCardProps {
  id: string;
  name: string;
  status: 'upcoming' | 'active' | 'completed' | 'processing' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  userId: string;
  agentId: string;
  agent: {
    id: string;
    name: string;
  };
}

const MeetingCard = ({ meeting }: { meeting: MeetingCardProps }) => {
  const router = useRouter()
  
  const statusColors = {
    upcoming: 'bg-yellow-500',
    active: 'bg-green-500',
    completed: 'bg-green-500',
    processing: 'bg-blue-500',
    cancelled: 'bg-red-500',
    in_progress: 'bg-blue-500',
  }
  
  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent event bubbling to avoid any parent click handlers
    e.stopPropagation();
    router.push(`/meetings/${meeting.id}`);
  }

  const statusText = {
    scheduled: 'Scheduled',
    completed: 'Completed',
    cancelled: 'Cancelled',
    in_progress: 'In Progress',
  }

  const statusColor = statusColors[meeting.status as keyof typeof statusColors] || 'bg-gray-500'
  const statusDisplay = statusText[meeting.status as keyof typeof statusText] || meeting.status

  return (
    <div 
      className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${statusColor}`}></div>
          <span className="text-sm text-muted-foreground">{statusDisplay}</span>
        </div>
        <div className="text-sm text-muted-foreground">
          {meeting.createdAt ? new Date(meeting.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'No time set'}
        </div>
      </div>
      
      <h3 className="font-medium mb-2">{meeting.name}</h3>
      
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <GeneratedAvatar 
              seed={meeting.agent?.name || 'Agent'} 
              variant="botttsNeutral"
              className="h-10 w-10"
            />
          </div>
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground">With</span>
            <div className="flex items-center gap-1 px-2 py-1 bg-muted/50 rounded-md">
              <p className="text-sm font-medium">{meeting.agent?.name || `Agent ${meeting.agentId?.substring(0, 4) || ''}`}</p>
              <ChevronRight className="h-3 w-3 text-muted-foreground" />
            </div>
            <span className="text-xs text-muted-foreground">(Agent)</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const useMeetings = () => {
  const trpc = useTRPC()
  return useSuspenseQuery(trpc.meetings.getMany.queryOptions({}))
}

export const MeetingView = () => {
  const router = useRouter()
  const trpc = useTRPC()
  const [filters,setFilter]=useMeetingsFilter();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({
    ...filters
  }))

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">My Meetings</h1>
        <div className="mt-1 h-0.5 w-12 bg-primary/20 rounded-full"></div>
      </div>

      {data?.items?.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No meetings found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.items?.map((meeting) => (
            <MeetingCard 
              key={meeting.id} 
              meeting={meeting}
            />
            
          ))}
          
        </div>
      )}
    </div>
  )
}


export const MeetingsViewLoading = () => {
  return (
    <LoadingState
      title="Loading Agents"
      description="This may take some time"
    />
  );
};

export const  MeetingsViewError = () => {
  return (
    <ErrorState
      title="Error Loading Agents"
      description="Somethings went wrong"
    />
  );
};
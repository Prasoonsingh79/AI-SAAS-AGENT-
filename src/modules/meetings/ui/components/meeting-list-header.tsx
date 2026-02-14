"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import { NewMeeetingDialog } from "./new-meeting-dialog";
import { useState } from "react";
import { MeetingsSearchFilter } from "./meetings-search-fliters";
import { StatusFilter } from "./status-filter";
import { AgentIdFilter } from "./agent-id-filter";
import { useMeetingsFilter } from "../../hooks/use-meetings-filter";
import { ScrollArea } from "@/components/ui/scroll-area";

export const MeetingsListHeader = () => {
    const [filters, setFilters] = useMeetingsFilter();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const clearFilters = () => {
        setFilters({ 
            search: '', 
            status: null, 
            agentId: '',
            page: 1 
        });
    };

    const isAnyFilterModified = 
        filters.search !== '' || 
        filters.status !== null||
        filters.agentId !== '';
  return (
    <>
    <NewMeeetingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}/>
      <div className="py-4 px-4 md:py-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5> My Meetings</h5>
          <Button onClick={() => setIsDialogOpen(true)}>
            <PlusIcon />
            New Meeting
          </Button>
        </div>
       
        <ScrollArea className="w-full whitespace-nowrap pb-2">
          <div className="flex items-center gap-x-2 p-1 w-max [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-muted-foreground/30">
            <MeetingsSearchFilter/>
            <StatusFilter/>
            <AgentIdFilter/>
            {isAnyFilterModified && (
              <Button 
                variant="outline" 
                onClick={clearFilters}
                className="shrink-0"
              >
                <XCircleIcon className="size-4 mr-1"/>
                Clear
              </Button>
            )}
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

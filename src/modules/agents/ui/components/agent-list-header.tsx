"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import { NewAgentDialog } from "./new-agent-dialog";
import { useState } from "react";
import { useAgentsFilter } from "../../hooks/use-agents-filter";
import { AgentsSearchFilter } from "./agents-search-fliters";
import { DEFAULT_PAGE } from "@/constants";
import { ScrollArea } from "@/components/ui/scroll-area";

export const AgentsListHeader = () => {
  const [filters,setFilters]=useAgentsFilter()
  const [isDialogOpen, setIsDialogOpen] = useState(false);
 
  const isAnyFilterModified= !! filters.search;

  const onClearFilters = () =>{
    setFilters({
      search:"",
      page:DEFAULT_PAGE,
    })
  }

  return (
    <>
      <NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}/>
      <div className="py-4 px-4 md:py-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5>My Agents</h5>
          <Button onClick={() => setIsDialogOpen(true)}>
            <PlusIcon />
            New Agent
          </Button>
        </div>

        <ScrollArea className="w-full whitespace-nowrap pb-2">
          <div className="flex items-center gap-x-2 p-1 w-max [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-muted-foreground/30">
            <AgentsSearchFilter />
            {isAnyFilterModified && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onClearFilters}
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

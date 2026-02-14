import Link from "next/link";
import Markdown from "react-markdown";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";


import { MeetingGetOne } from "../../types";
import {
    BookOpenTextIcon,
    FileTextIcon,
    SparklesIcon,
    FileVideoIcon,
    ClockFadingIcon,
    LoaderIcon,

} from "lucide-react";
import { useState, useEffect } from "react";
import { StreamTranscriptItem } from "../../types";

import { GeneratedAvatar } from "@/components/generated-avatar";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { formatDuration } from "@/lib/utils";

interface Props {
    data: MeetingGetOne;
}

export const CompletedState = ({ data }: Props) => {
    return (
        <div className="flex flex-col gap-y-4">
            <Tabs defaultValue="summary">
                <div className=" bg-white rounded-lg border px-3">
                    <ScrollArea>
                        <TabsList className="p-0 bg-background justify-start rounded-none h-13">
                            <TabsTrigger value="summary"
                                className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[active=active]:border-b-primary 
                        data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground">
                                <BookOpenTextIcon />
                                Summary
                            </TabsTrigger>
                            <TabsTrigger value="transcript"
                                className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[active=active]:border-b-primary 
                        data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground">
                                <FileTextIcon />
                                Transcript
                            </TabsTrigger>
                            <TabsTrigger value="recording"
                                className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[active=active]:border-b-primary 
                        data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground">
                                <FileVideoIcon />
                                Recording
                            </TabsTrigger>
                            <TabsTrigger value="Chat"
                                className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[active=active]:border-b-primary 
                        data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground">
                                <SparklesIcon />
                                Ask AI
                            </TabsTrigger>
                        </TabsList>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>

                </div>
                <TabsContent value="recording">
                    <div className="bg-white rounded-lg border px-4 py-5">
                        {data.recordingUrl ? (
                            <video
                                src={data.recordingUrl}
                                className="w-full rounded-lg"
                                controls />
                        ) : (
                            <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
                                <FileVideoIcon className="size-8 mb-2" />
                                <p className="font-medium">Recording not available</p>
                                <p className="text-sm">The recording is being processed or was not found.</p>
                            </div>
                        )}
                    </div>
                </TabsContent>
                <TabsContent value="summary">
                    <div className="bg-white rounded-lg border">
                        <div className="px-4 py-5 gap-y-5 fles fles-col col-span-5">
                            <h2 className="text-2xl front-medium capitalize">{data.name}</h2>
                            <div className="flex gap-x-2 item-center ">
                                <Link href={`/agents/${data.agent.id}`}
                                    className="flex items-center underline underline-offset-4 capitalize">
                                    <GeneratedAvatar
                                        variant="botttsNeutral"
                                        seed={data.agent.name}
                                        className="size-5" />
                                    {data.agent.name}
                                </Link>{" "}
                                <p>{data.startedAt ? format(data.startedAt, "PPP") : ""}</p>
                            </div>
                            <div className="flex gap-x-2 items-center">
                                <SparklesIcon className="size-4" />
                                <p>
                                    Generral Summary
                                </p>
                            </div>
                            <Badge
                                variant="outline"
                                className="flex items-center gap-x-2 [&>svg]:size-4">
                                <ClockFadingIcon className="text-blue-700" />
                                {data.duration ? formatDuration(data.duration) : "No Duration"}
                            </Badge>
                            <div>
                                <Markdown components={{
                                    h1: (props) => (
                                        <h1 className="text-2xl font-medium mb-6 "{...props} />
                                    ),
                                    h2: (props) => (
                                        <h1 className="text-xl font-medium mb-6 "{...props} />
                                    ),
                                    h3: (props) => (
                                        <h1 className="text-lg font-medium mb-6 "{...props} />
                                    ),
                                    h4: (props) => (
                                        <h1 className="text-base font-medium mb-6 "{...props} />
                                    ),
                                    p: (props) => (
                                        <p className="mb-6 leading-relaxed" {...props} />
                                    ),
                                    ol: (props) => (
                                        <ol className="mb-6 list-disc list-inside" {...props} />
                                    ),
                                    ul: (props) => (
                                        <ul className="mb-6 list-decimal list-inside" {...props} />
                                    ),
                                    li: (props) =>
                                        <li className="mb-6 list-decimal list-inside" {...props} />,

                                    strong: (props) => (
                                        <strong className="font-semibold" {...props} />
                                    ),
                                    code: (props) => (
                                        <code className="bg-gray-100 p-1 rounded" {...props} />
                                    ),
                                    blockquote: (props) => (
                                        <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4" {...props} />
                                    )
                                }}>
                                    {data.summary}
                                </Markdown>
                            </div>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="transcript">
                    <div className="bg-white rounded-lg border p-4">
                        {data.transcriptUrl ? (
                            <TranscriptView url={data.transcriptUrl} agentId={data.agent.id} agentName={data.agent.name} />
                        ) : (
                            <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
                                <p>No transcript available for this meeting.</p>
                            </div>
                        )}
                    </div>
                </TabsContent>
                <TabsContent value="Chat">
                    <div className="bg-white rounded-lg border p-4">
                        <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
                            <SparklesIcon className="size-8 mb-2" />
                            <p className="font-medium">Ask AI</p>
                            <p className="text-sm">Chat with your meeting insights coming soon.</p>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div >
    );
};

interface TranscriptViewProps {
    url: string;
    agentId: string;
    agentName: string;
}

const TranscriptView = ({ url, agentId, agentName }: TranscriptViewProps) => {
    const [transcript, setTranscript] = useState<StreamTranscriptItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetch(url)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Failed to fetch transcript: ${res.statusText}`);
                }
                return res.text();
            })
            .then((text) => {
                try {
                    // Try to parse as regular JSON first (in case it's a single array)
                    const data = JSON.parse(text);
                    if (Array.isArray(data)) {
                        setTranscript(data);
                        return;
                    }
                } catch {
                    // If regular JSON parse fails, try JSONL (newline delimited)
                }

                try {
                    const lines = text.split('\n').filter(line => line.trim() !== '');
                    const data = lines.map(line => JSON.parse(line));
                    setTranscript(data);
                } catch (err) {
                    console.error("Error parsing transcript:", err);
                    setError("Failed to parse transcript.");
                }
            })
            .catch((err) => {
                console.error("Error fetching transcript:", err);
                setError("Failed to load transcript.");
            })
            .finally(() => setLoading(false));
    }, [url]);

    if (loading) {
        return (
            <div className="flex justify-center p-8">
                <LoaderIcon className="size-6 animate-spin text-muted-foreground" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-center text-red-500">
                <p>{error}</p>
            </div>
        );
    }

    if (!transcript || transcript.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
                <p>Transcript is empty.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-y-4 p-4 max-h-[500px] overflow-y-auto">
            {transcript.map((item, index) => (
                <div key={index} className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-muted-foreground">
                            {item.speaker_id === agentId ? agentName : "User"}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                            {formatDuration(item.start_ts)}
                        </span>
                    </div>
                    <p className="text-sm leading-relaxed">
                        {item.text}
                    </p>
                </div>
            ))}
        </div>
    )
}
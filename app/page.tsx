"use client";

import { AIInputWithSearch } from "@/components/ui/ai-input-with-search";
import { Label } from "@/components/ui/label";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ExpandableTextArea } from "@/components/expandable-text-area";
import { useId, useState } from "react";
import { AppCarousel } from "@/components/app-carousel";
import { ExpertsCarousel } from "@/components/experts-carousel";
import { RelevantDocuments } from "@/components/relevant-documents";
import { submitQuery } from "@/api/services/api";
import { Document} from "@/api/types/api";

export default function Home() {
    const textareaId = useId();
    const [answer, setAnswer] = useState("");
    const [documents, setDocuments] = useState<Document[]>([]);
    const [experts, setExperts] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (value: string, withSearch: boolean) => {
        try {
            // Clear documents and experts immediately when a new query is submitted
            setDocuments([]);
            setExperts([]);
            setIsLoading(true);
            setError(null);
            
            const response = await submitQuery({ query: value });
            setAnswer(response.parsedData.text);
            setDocuments(response.parsedData.documents);
            setExperts(response.parsedData.experts);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            console.error('Error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="w-full mx-auto space-y-8">
                <div>
                    <AIInputWithSearch 
                        onSubmit={handleSubmit}
                        onFileSelect={(file) => {
                            console.log('Selected file:', file);
                        }}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor={textareaId} className="text-xl font-bold">
                        {isLoading ? "Thinking..." : "Answer"}
                    </Label>
                    {error && (
                        <div className="text-red-500 text-sm">{error}</div>
                    )}
                    {isLoading ? (
                        <div className="min-h-[80px] border rounded-md border-input bg-background px-3 py-2">
                            <LoadingSpinner size="md" />
                        </div>
                    ) : (
                        <ExpandableTextArea
                            id={textareaId}
                            value={answer}
                            placeholder="Your answer will appear here"
                            maxHeight={200}
                        />
                    )}
                </div>
                {documents.length > 0 && <AppCarousel documents={documents} />}
                {experts.length > 0 && <ExpertsCarousel experts={experts} />}
            </div>
        </div>
    );
}

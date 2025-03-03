"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import { Document } from "@/api/types/api";

interface RelevantDocumentsProps {
  documents?: Document[];
}

export function RelevantDocuments({ documents = [] }: RelevantDocumentsProps) {
  if (documents.length === 0) {
    return null;
  }

  // Helper function to determine the file type icon based on document title
  const getDocumentIcon = (title: string) => {
    const lcTitle = title.toLowerCase();
    
    if (lcTitle.endsWith('.pdf') || lcTitle.includes('pdf')) {
      return '/pdf.svg';
    } else if (lcTitle.endsWith('.doc') || lcTitle.endsWith('.docx') || lcTitle.includes('word') || lcTitle.includes('doc')) {
      return '/doc.svg';
    } else if (lcTitle.endsWith('.ppt') || lcTitle.endsWith('.pptx') || lcTitle.includes('powerpoint') || lcTitle.includes('presentation')) {
      return '/ppt.svg';
    } else if (lcTitle.endsWith('.xls') || lcTitle.endsWith('.xlsx') || lcTitle.includes('excel') || lcTitle.includes('spreadsheet')) {
      return '/xls.svg';
    }
    
    // Default to PDF if we can't determine the type
    return '/pdf.svg';
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Relevant Documents</h2>
      <div className="flex flex-col space-y-3">
        {documents.map((doc, index) => (
          <a
            key={index}
            href={doc.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 rounded-lg border border-gray-200 hover:border-sky-500 transition-colors cursor-pointer bg-white shadow-sm hover:shadow-md"
            style={{ 
              height: "80px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <h3 className="font-medium text-lg truncate pr-4 flex-1">{doc.title}</h3>
            <div className="flex-shrink-0">
              <Image 
                src={getDocumentIcon(doc.title)}
                alt="Document type"
                width={36}
                height={36}
              />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

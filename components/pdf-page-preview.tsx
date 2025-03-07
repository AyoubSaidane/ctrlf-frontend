"use client"
import { useState, useEffect } from 'react';
import { getEmbedUrl } from '@/utils/pdf-utils';

interface PDFPagePreviewProps {
  url: string;
  page: number;
  width?: number;
}

export function PDFPagePreview({ url, page, width = 200 }: PDFPagePreviewProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get the embeddable URL (converts Google Drive URLs if needed)
  const embedUrl = getEmbedUrl(url);
  
  // Create a URL that includes the page parameter
  const iframeUrl = `${embedUrl}#page=${page}`;
  
  // Handle iframe load events
  const handleIframeLoad = () => {
    setLoading(false);
  };

  const handleIframeError = () => {
    setError('Failed to load PDF');
    setLoading(false);
  };

  useEffect(() => {
    // Reset loading state when URL or page changes
    setLoading(true);
    setError(null);
  }, [url, page]);

  return (
    <div className="relative w-full h-full min-h-[200px] bg-gray-100 flex items-center justify-center rounded-t-lg overflow-hidden">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-red-500 z-10">
          <p className="text-sm">{error}</p>
        </div>
      )}
      
      <iframe
        src={iframeUrl}
        title={`PDF preview page ${page}`}
        className="w-full h-full"
        style={{ 
          maxWidth: `${width}px`, 
          height: loading ? '0' : '100%',
          minHeight: loading ? '0' : '200px'
        }}
        onLoad={handleIframeLoad}
        onError={handleIframeError}
        frameBorder="0"
      />
    </div>
  );
}

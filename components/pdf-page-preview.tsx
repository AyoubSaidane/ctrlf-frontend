"use client"
import { useState, useEffect } from 'react';
import { renderPageToDataUrl, configurePdfjs } from '@/lib/pdf-service';

interface PDFPagePreviewProps {
  url: string;
  page: number;
  width?: number;
}

export function PDFPagePreview({ url, page, width = 200 }: PDFPagePreviewProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    // Initialize PDF.js when component mounts
    configurePdfjs();
  }, []);

  useEffect(() => {
    let isMounted = true;
    
    const generatePreview = async () => {
      if (!url || !page) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // Calculate appropriate scale based on width
        const scale = width / 600; // Approximate width of a PDF page at scale 1.0
        const dataUrl = await renderPageToDataUrl({ url, page, scale });
        
        if (isMounted) {
          setPreviewUrl(dataUrl);
        }
      } catch (err) {
        console.error("PDF render error:", err);
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load PDF');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    generatePreview();
    
    return () => {
      isMounted = false;
    };
  }, [url, page, width]);

  return (
    <div className="relative w-full h-full min-h-[200px] bg-gray-100 flex items-center justify-center rounded-t-lg overflow-hidden">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-red-500">
          <p className="text-sm">{error}</p>
        </div>
      )}
      
      {previewUrl && !loading && (
        <img 
          src={previewUrl}
          alt={`Preview of page ${page}`}
          className="max-w-full max-h-full object-contain"
          style={{ maxWidth: `${width}px` }}
        />
      )}
    </div>
  );
}

/**
 * Utility functions for working with PDFs
 */

/**
 * Creates a URL with the page parameter for PDF viewing
 */
export function createPdfPageUrl(url: string, page: number): string {
  // Add the page parameter to the URL
  return `${url}#page=${page}`;
}

/**
 * Checks if a URL is a PDF
 */
export function isPdfUrl(url: string): boolean {
  return url.toLowerCase().endsWith('.pdf');
}

/**
 * Converts Google Drive URLs to embeddable format
 * From: https://drive.google.com/file/d/{fileId}/view?usp=sharing
 * To: https://drive.google.com/file/d/{fileId}/preview
 */
export function getEmbedUrl(url: string): string {
  // Check if it's a Google Drive URL
  if (url.includes('drive.google.com/file/d/')) {
    // Extract the file ID
    const fileIdMatch = url.match(/\/file\/d\/([^/]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      const fileId = fileIdMatch[1];
      return `https://drive.google.com/file/d/${fileId}/preview`;
    }
  }
  // Return the original URL if it's not a Google Drive URL
  return url;
}

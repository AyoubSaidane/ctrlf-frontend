// PDF service to handle rendering pages as data URLs

export const configurePdfjs = async () => {
  if (typeof window !== 'undefined') {
    const pdfjs = await import('pdfjs-dist');
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
    return pdfjs;
  }
  return null;
};

interface RenderPageOptions {
  url: string;
  page: number;
  scale: number;
}

export const renderPageToDataUrl = async ({ url, page, scale }: RenderPageOptions): Promise<string> => {
  const pdfjs = await configurePdfjs();
  if (!pdfjs) throw new Error('PDF.js could not be initialized');

  try {
    const pdf = await pdfjs.getDocument({
      url,
      disableAutoFetch: true,
      disableStream: true,
    }).promise;

    const pdfPage = await pdf.getPage(page);
    
    const viewport = pdfPage.getViewport({ scale });
    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Failed to get canvas context');
    
    await pdfPage.render({
      canvasContext: context,
      viewport
    }).promise;

    return canvas.toDataURL();
  } catch (error) {
    console.error("Error rendering PDF:", error);
    throw error;
  }
};

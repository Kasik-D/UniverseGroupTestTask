import { PDFViewerProps } from '../types';
import { Document, Page } from 'react-pdf';
import { useState, useCallback, memo, useEffect } from 'react';

const PDFViewer = memo(({ document, loading }: PDFViewerProps) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pdfData, setPdfData] = useState<ArrayBuffer | null>(null);

  useEffect(() => {
    if (document?.fileData) {
      try {
        // Create a new ArrayBuffer and copy the data
        const newBuffer = new ArrayBuffer(document.fileData.byteLength);
        const sourceArray = new Uint8Array(document.fileData);
        const targetArray = new Uint8Array(newBuffer);
        targetArray.set(sourceArray);
        setPdfData(newBuffer);
        setError(null);
      } catch (err) {
        console.error('Error processing PDF data:', err);
        setError('Error processing PDF data');
      }
    } else {
      setPdfData(null);
      setError(null);
    }
  }, [document]);

  const handleLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setError(null);
  }, []);

  const handleLoadError = useCallback((error: Error) => {
    console.error('Error loading PDF:', error);
    setError('Error loading PDF');
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96 text-red-500">
        {error}
      </div>
    );
  }

  if (!document || !pdfData) {
    return (
      <div className="flex items-center justify-center h-96 text-gray-500">
        No PDF selected. Convert some text to see the preview.
      </div>
    );
  }

  return (
    <div className="h-96 overflow-auto bg-white">
      <Document
        file={pdfData}
        onLoadSuccess={handleLoadSuccess}
        onLoadError={handleLoadError}
        className="flex flex-col items-center"
      >
        {numPages &&
          Array.from({ length: numPages }, (_, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              width={400}
              className="my-2"
            />
          ))}
      </Document>
    </div>
  );
});

PDFViewer.displayName = 'PDFViewer';

export default PDFViewer;
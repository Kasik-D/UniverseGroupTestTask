import { PDFDocument } from '../types';
import { getPDFHistory } from '../utils/indexedDB';
import { useState, useEffect, useCallback, memo } from 'react';

interface HistoryProps {
  onSelectPDF: (pdf: PDFDocument | null) => void;
  latestPDF?: PDFDocument;
}

const History = memo(({ onSelectPDF, latestPDF }: HistoryProps) => {
  const [history, setHistory] = useState<PDFDocument[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [selectedPDFId, setSelectedPDFId] = useState<string | null>(null);

  const loadHistory = useCallback(async () => {
    try {
      setIsLoadingHistory(true);
      const storedHistory = await getPDFHistory();
      setHistory(storedHistory || []);
      
      // Always select the latest PDF if it exists
      if (latestPDF) {
        setSelectedPDFId(latestPDF.id);
      }
    } catch (error) {
      console.error('Error loading history:', error);
    } finally {
      setIsLoadingHistory(false);
    }
  }, [latestPDF]);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const handlePDFClick = useCallback((pdf: PDFDocument) => {
    setSelectedPDFId(pdf.id);
    onSelectPDF(pdf);
  }, [onSelectPDF]);

  return (
    <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
        Conversion History
      </h2>
      {isLoadingHistory ? (
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      ) : history.length > 0 ? (
        <div className="divide-y divide-gray-100">
          {history.map((pdf, index) => (
            <div
              key={pdf.id}
              className={`p-4 cursor-pointer transition-all duration-300 relative m-2 rounded-lg border transform hover:scale-[1.02] ${
                selectedPDFId === pdf.id
                  ? 'bg-blue-50 border-blue-300 shadow-sm'
                  : 'bg-white border-gray-200 hover:border-blue-200 hover:shadow-sm'
              }`}
              style={{
                animation: `fadeIn 0.3s ease-out ${index * 0.1}s both`
              }}
              onClick={() => handlePDFClick(pdf)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">
                    {new Date(pdf.createdAt).toLocaleString()}
                  </p>
                  <p className="text-gray-700 line-clamp-2">
                    {pdf.text}
                  </p>
                </div>
                <div className="ml-4 flex items-center">
                  <span className={`text-xs px-2 py-1 rounded-full transition-colors duration-200 ${
                    selectedPDFId === pdf.id
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {selectedPDFId === pdf.id ? 'Selected' : 'Click to view'}
                  </span>
                </div>
              </div>
              {selectedPDFId === pdf.id && (
                <div className="absolute bottom-0 right-0 p-2 animate-fadeIn">
                  <span className="text-xs text-blue-500">Currently viewing</span>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center text-gray-500 animate-fadeIn">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="mt-2">No conversions yet</p>
          <p className="text-sm mt-1">Convert some text to see it here!</p>
        </div>
      )}
    </div>
  );
});

History.displayName = 'History';

export default History;
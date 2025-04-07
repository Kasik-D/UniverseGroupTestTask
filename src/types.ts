export interface PDFDocument {
  id: string;
  text: string;
  fileData: ArrayBuffer;
  createdAt: string;
}

export interface TextInputProps {
  setCurrentPDF: (pdf: PDFDocument) => void;
  setLoading: (loading: boolean) => void;
}

export interface PDFViewerProps {
  document: PDFDocument | null;
  loading: boolean;
}

export interface HistoryProps {
  onSelectPDF: (pdf: PDFDocument | null) => void;
  latestPDF?: PDFDocument;
} 
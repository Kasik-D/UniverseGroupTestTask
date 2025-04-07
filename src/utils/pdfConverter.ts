import axios from 'axios';
import { addPDFToHistory } from './indexedDB';

const API_KEY = '78684310-850d-427a-8432-4a6487f6dbc4';
const API_URL = 'http://95.217.134.12:4010/create-pdf';

export interface PDFDocument {
  id: string;
  text: string;
  fileData: ArrayBuffer;
  createdAt: string;
}

export const convertTextToPDF = async (text: string): Promise<PDFDocument> => {
  if (!text.trim()) {
    throw new Error('Text cannot be empty');
  }

  const response = await axios.post(`${API_URL}?apiKey=${API_KEY}`, { text }, {
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/pdf'
    }
  });

  if (!response.data) {
    throw new Error('No PDF data received from API');
  }

  const blob = response.data as Blob;
  const arrayBuffer = await blob.arrayBuffer();

  const newPDF: PDFDocument = {
    id: Date.now().toString(),
    text,
    fileData: arrayBuffer,
    createdAt: new Date().toISOString(),
  };

  // Add to history
  await addPDFToHistory(newPDF);

  return newPDF;
}; 
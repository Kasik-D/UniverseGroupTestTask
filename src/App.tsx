import { useState, useCallback } from 'react'
import TextInput from './components/TextInput'
import PDFViewer from './components/PDFViewer'
import History from './components/History'
import { PDFDocument } from './types'
import './App.css'
import './styles/pdf.css'
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { pdfjs } from 'react-pdf';

// Fix worker issue
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

function App() {
  const [currentPDF, setCurrentPDF] = useState<PDFDocument | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [latestPDF, setLatestPDF] = useState<PDFDocument | undefined>(undefined)
  
  const handlePDFCreated = useCallback((pdf: PDFDocument) => {
    setCurrentPDF(pdf)
    setLatestPDF(pdf)
  }, [])

  const handlePDFSelected = useCallback((pdf: PDFDocument | null) => {
    setCurrentPDF(pdf)
  }, [])

  const handleLoading = useCallback((loading: boolean) => {
    setIsLoading(loading)
  }, [])

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Text to PDF Converter
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <TextInput 
              setCurrentPDF={handlePDFCreated} 
              setLoading={handleLoading} 
            />
            <History 
              onSelectPDF={handlePDFSelected} 
              latestPDF={latestPDF} 
            />
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <PDFViewer 
              document={currentPDF} 
              loading={isLoading} 
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

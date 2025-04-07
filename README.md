# Text to PDF Converter

A React application that allows users to convert text to PDF documents using an external API. The application features a modern UI built with Tailwind CSS and includes functionality for viewing conversion history.

## Features

- Text to PDF conversion using external API
- Real-time PDF preview with react-pdf
- Conversion history with IndexedDB storage
- Responsive design with Tailwind CSS
- Optimized performance with React.memo and useCallback
- Error handling and loading states
- Modern UI with interactive history items

## Project Structure

```
pdf-converter/
├── src/
│   ├── components/
│   │   ├── TextInput.tsx     # Text input and conversion logic
│   │   ├── PDFViewer.tsx     # PDF preview component with react-pdf
│   │   ├── History.tsx       # Conversion history with IndexedDB
│   │   └── __tests__/        # Component tests
│   ├── utils/
│   │   ├── pdfConverter.ts   # PDF conversion logic
│   │   └── indexedDB.ts      # IndexedDB operations
│   ├── types.ts              # TypeScript interfaces
│   ├── App.tsx               # Main application component
│   └── index.tsx             # Application entry point
├── public/                   # Static assets
└── package.json             # Project dependencies
```

## Core Components

### TextInput
- Handles text input and PDF conversion
- Makes API calls to the conversion service
- Manages loading states and error handling
- Optimized with React.memo and useCallback
- Real-time validation and feedback

### PDFViewer
- Displays PDF preview using react-pdf
- Handles ArrayBuffer data properly to prevent detachment
- Shows loading spinner during conversion
- Error handling for invalid PDFs
- Responsive design with proper scaling

### History
- Displays conversion history from IndexedDB
- Real-time updates when new conversions are added
- Interactive history items with hover and selection states
- Optimized rendering with React.memo
- Proper state management for selected items
- Modern UI with Tailwind CSS

## API Integration

The application uses the following API endpoint for PDF conversion:
```
POST http://95.217.134.12:4010/create-pdf?apiKey={API_KEY}
```

Request body:
```json
{
  "text": "Your text content here"
}
```

Response:
```json
{
  "id": "unique-id",
  "text": "Original text",
  "fileData": "Base64 encoded PDF data",
  "createdAt": "timestamp"
}
```

## Data Storage

The application uses IndexedDB for storing PDF conversion history:
- Stores PDF documents with metadata
- Handles ArrayBuffer data properly
- Provides real-time updates
- Optimized for performance

## Performance Optimizations

- React.memo for component memoization
- useCallback for function memoization
- Proper state management
- Optimized re-renders
- Efficient data handling
- Proper cleanup of resources

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Run tests:
   ```bash
   npm test
   ```

## Technologies Used

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Vitest
- React Testing Library
- Axios
- IndexedDB
- react-pdf

## Development

### Key Features Implemented
- PDF conversion with external API
- Real-time PDF preview
- Conversion history with IndexedDB
- Modern UI with Tailwind CSS
- Performance optimizations
- Error handling
- Loading states
- Responsive design

### Recent Improvements
- Fixed ArrayBuffer detachment issues
- Optimized history component rendering
- Improved PDF preview handling
- Enhanced error handling
- Added loading states
- Improved UI/UX
- Optimized state management

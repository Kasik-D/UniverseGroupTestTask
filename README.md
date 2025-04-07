# Text to PDF Converter

A React application that allows users to convert text to PDF documents using an external API. The application features a modern UI built with Tailwind CSS and includes functionality for viewing conversion history.

## Features

- Text to PDF conversion using external API
- Real-time PDF preview
- Conversion history with local storage
- Responsive design
- Unit tests for core functionality

## Project Structure

```
pdf-converter/
├── src/
│   ├── components/
│   │   ├── TextInput.tsx     # Text input and conversion logic
│   │   ├── PDFViewer.tsx    # PDF preview component
│   │   ├── History.tsx      # Conversion history component
│   │   └── __tests__/       # Component tests
│   ├── types.ts             # TypeScript interfaces
│   ├── App.tsx              # Main application component
│   └── index.tsx            # Application entry point
├── public/                  # Static assets
└── package.json            # Project dependencies
```

## Core Components

### TextInput
- Handles text input and PDF conversion
- Makes API calls to the conversion service
- Manages loading states and error handling
- Saves conversion history to local storage

### PDFViewer
- Displays PDF preview using iframe
- Shows loading spinner during conversion
- Handles empty states

### History
- Displays conversion history from local storage
- Allows viewing previous conversions
- Updates in real-time when new conversions are added

## API Integration

The application uses the following API endpoint for PDF conversion:
```
POST http://95.217.134.12:4010/create-pdf?apiKey={API_KEY}
```

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

- React
- TypeScript
- Tailwind CSS
- Vite
- Vitest
- React Testing Library
- Axios

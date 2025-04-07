import { useState, useCallback, memo, ChangeEvent } from 'react';
import { TextInputProps } from '../types';
import { isEmpty } from 'ramda';
import { convertTextToPDF } from '../utils/pdfConverter';

const TextInput = memo(({ setCurrentPDF, setLoading }: TextInputProps) => {
  const [text, setText] = useState('');

  const handleConvert = useCallback(async () => {
    if (isEmpty(text.trim())) return;

    try {
      setLoading(true);
      console.log('Sending request to API...');
      
      const newPDF = await convertTextToPDF(text);
      setCurrentPDF(newPDF);
    } catch (error) {
      console.error('Detailed error:', error);
      alert('Failed to convert text to PDF. Please check the console for details.');
    } finally {
      setLoading(false);
    }
  }, [text, setCurrentPDF, setLoading]);

  const handleTextChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  }, []);

  return (
    <div className="space-y-4">
      <textarea
        className="w-full h-48 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your text here..."
        value={text}
        onChange={handleTextChange}
      />
      <button
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        onClick={handleConvert}
      >
        Convert to PDF
      </button>
    </div>
  );
});

TextInput.displayName = 'TextInput';

export default TextInput;
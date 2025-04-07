import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { convertTextToPDF } from '../pdfConverter';

// Mock axios
vi.mock('axios');

// Mock IndexedDB
const mockDB = {
  open: vi.fn().mockImplementation(() => {
    const request = {
      onerror: null as (() => void) | null,
      onsuccess: null as (() => void) | null,
      onupgradeneeded: null as (() => void) | null,
      result: {
        createObjectStore: vi.fn(),
        transaction: vi.fn().mockImplementation((storeName, mode) => ({
          objectStore: vi.fn().mockImplementation((storeName) => ({
            add: vi.fn().mockImplementation((data) => {
              const request = {
                onsuccess: null as (() => void) | null,
                onerror: null as (() => void) | null,
                result: data
              };
              // Simulate async operation
              setTimeout(() => {
                if (request.onsuccess) {
                  request.onsuccess();
                }
              }, 0);
              return request;
            })
          }))
        }))
      }
    };
    // Simulate async open
    setTimeout(() => {
      if (request.onsuccess) {
        request.onsuccess();
      }
    }, 0);
    return request;
  })
};

// Mock global indexedDB
global.indexedDB = mockDB as any;

describe('PDF Converter', () => {
  const mockBlob = new Blob(['test'], { type: 'application/pdf' });

  beforeEach(() => {
    vi.clearAllMocks();
    (axios.post as any).mockResolvedValue({
      data: mockBlob
    });
  });

  it('converts text to PDF successfully', async () => {
    const text = 'Test text';
    const result = await convertTextToPDF(text);

    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining('create-pdf'),
      { text },
      expect.any(Object)
    );

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('text', text);
    expect(result).toHaveProperty('fileData');
    expect(result).toHaveProperty('createdAt');
  }, { timeout: 10000 }); // Increased timeout to 10 seconds

  it('throws error for empty text', async () => {
    await expect(convertTextToPDF('')).rejects.toThrow('Text cannot be empty');
    await expect(convertTextToPDF('   ')).rejects.toThrow('Text cannot be empty');
  });

  it('handles API errors', async () => {
    (axios.post as any).mockRejectedValue(new Error('API Error'));
    await expect(convertTextToPDF('test')).rejects.toThrow('API Error');
  });

  it('handles empty response data', async () => {
    (axios.post as any).mockResolvedValue({ data: null });
    await expect(convertTextToPDF('test')).rejects.toThrow('No PDF data received from API');
  });
}); 
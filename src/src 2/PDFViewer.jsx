import React, { useState, useEffect, useRef } from 'react';
import { Worker, Viewer, RenderPageProps } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;

const PDFViewer = () => {
  const [textLines, setTextLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const viewerRef = useRef(null);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    const loadPdf = async (pdfUrl) => {
      try {
        const loadingTask = pdfjsLib.getDocument({ url: pdfUrl });
        const pdfDoc = await loadingTask.promise;

        const numPages = pdfDoc.numPages;
        let linesArray = [];

        for (let i = 1; i <= numPages; i++) {
          const page = await pdfDoc.getPage(i);
          const textContent = await page.getTextContent();
          
          let currentLine = '';
          textContent.items.forEach(item => {
            if (item.str.trim()) {
              currentLine += item.str + ' ';
              // Assuming line breaks are indicated by new line characters
              if (item.hasOwnProperty('newline')) {
                linesArray.push(currentLine.trim());
                currentLine = '';
              }
            }
          });
          // Push any remaining text as the last line
          if (currentLine.trim()) {
            linesArray.push(currentLine.trim());
          }
        }

        setTextLines(linesArray);
      } catch (error) {
        console.error('Error loading PDF:', error);
      }
    };

    loadPdf('./example_research_paper.pdf');

    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        setCurrentLineIndex(prevIndex => Math.min(prevIndex + 1, textLines.length - 1));
      } else if (event.key === 'ArrowLeft') {
        setCurrentLineIndex(prevIndex => Math.max(prevIndex - 1, 0));
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [textLines]);

  const getHighlightStyle = (index) => {
    return index === currentLineIndex
      ? { backgroundColor: 'yellow', padding: '2px', borderRadius: '2px' }
      : {};
  };

  const handleSpanClick = (index) => {
    setCurrentLineIndex(index);
  };

  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column' }}>
      <div
        ref={viewerRef}
        style={{ flex: 1, overflow: 'auto' }}
      >
        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`}>
          <Viewer
            fileUrl="./example_research_paper.pdf"
            plugins={[defaultLayoutPluginInstance]}
          />
        </Worker>
      </div>
      <div style={{ padding: '10px', borderTop: '1px solid #ddd', backgroundColor: '#f5f5f5', maxHeight: '30%', overflowY: 'auto' }}>
        <strong>Highlighted Text:</strong>
        <div style={{ border: '1px solid #ddd', padding: '10px', marginTop: '5px' }}>
          {textLines.length > 0 ? (
            <div>
              {textLines.map((line, index) => (
                <div
                  key={index}
                  style={getHighlightStyle(index)}
                  onClick={() => handleSpanClick(index)}
                >
                  {line}
                </div>
              ))}
            </div>
          ) : (
            'Loading text...'
          )}
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;
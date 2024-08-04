import React, { useState, useEffect, useRef } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import * as pdfjsLib from 'pdfjs-dist';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;

const PDFViewer: React.FC = () => {
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(0);
  const [textContent, setTextContent] = useState<{ line: string; formula?: string }[]>([]);
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [glossary, setGlossary] = useState<Record<string, string>>({});
  const viewerRef = useRef<any>(null);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    const loadPdf = async () => {
      const loadingTask = pdfjsLib.getDocument({ url: './example_research_paper.pdf' });
      const pdfDoc = await loadingTask.promise;
      const numPages = pdfDoc.numPages;

      let textArray: { line: string; formula?: string }[] = [];

      for (let i = 1; i <= numPages; i++) {
        const page = await pdfDoc.getPage(i);
        const textContent = await page.getTextContent();

        let currentLine = '';
        for (const item of textContent.items) {
          if (isTextItem(item)) {
            if (item.str.includes('$')) { // Check for LaTeX formulas
              if (currentLine) {
                textArray.push({ line: currentLine });
                currentLine = '';
              }
              textArray.push({ line: item.str.replace(/^\$/, '').replace(/\$$/, ''), formula: item.str });
            } else {
              currentLine += item.str;
            }
          }
        }
        if (currentLine) {
          textArray.push({ line: currentLine });
        }
      }

      setTextContent(textArray);
    };

    loadPdf();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        setCurrentLineIndex(prevIndex => Math.min(prevIndex + 1, textContent.length - 1));
      } else if (event.key === 'ArrowLeft') {
        setCurrentLineIndex(prevIndex => Math.max(prevIndex - 1, 0));
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [textContent]);

  const getHighlightStyle = (index: number) => {
    if (index === currentLineIndex) {
      return { backgroundColor: 'yellow', padding: '2px', borderRadius: '2px' };
    }
    if (index < currentLineIndex) {
      return { backgroundColor: 'green', padding: '2px', borderRadius: '2px' };
    }
    return {};
  };

  const handleNoteChange = (index: number, note: string) => {
    setNotes(prevNotes => ({ ...prevNotes, [index]: note }));
  };

  const handleGlossaryChange = (term: string, definition: string) => {
    setGlossary(prevGlossary => ({ ...prevGlossary, [term]: definition }));
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`}>
          <Viewer
            fileUrl="./example_research_paper.pdf"
            plugins={[defaultLayoutPluginInstance]}
          />
        </Worker>
      </div>
      <div style={{ width: '300px', padding: '10px', borderLeft: '1px solid #ddd', backgroundColor: '#f5f5f5' }}>
        <h3>Highlighted Text</h3>
        {textContent.map((text, index) => (
          <div key={index}>
            <div style={getHighlightStyle(index)}>
              {text.formula ? <BlockMath math={`\\(${text.formula}\\)`} /> : text.line}
            </div>
            <textarea
              value={notes[index] || ''}
              onChange={(e) => handleNoteChange(index, e.target.value)}
              placeholder="Add a note..."
              style={{ width: '100%', marginTop: '5px' }}
            />
          </div>
        ))}
        <h3>Glossary</h3>
        <textarea
          placeholder="Add term and definition..."
          onChange={(e) => {
            const [term, definition] = e.target.value.split(':');
            if (term && definition) {
              handleGlossaryChange(term.trim(), definition.trim());
              e.target.value = '';
            }
          }}
          style={{ width: '100%' }}
        />
        <ul>
          {Object.entries(glossary).map(([term, definition]) => (
            <li key={term}><strong>{term}:</strong> {definition}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const isTextItem = (item: any): item is pdfjsLib.TextItem => {
  return (item as pdfjsLib.TextItem).str !== undefined;
};

export default PDFViewer;

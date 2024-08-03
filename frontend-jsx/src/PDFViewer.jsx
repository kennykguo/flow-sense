import React, { useEffect, useRef, useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import * as pdfjsLib from 'pdfjs-dist';
import './styles/PDFViewer.css'; // Import CSS file for highlighting

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;

const PDFViewer = () => {
  const viewerRef = useRef(null);
  const [highlightedSpan, setHighlightedSpan] = useState(null);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    const handleDocumentClick = (event) => {
      const target = event.target;

      if (target && target.classList.contains('rpv-core__text-layer-text')) {
        // Remove highlight from previously highlighted span
        if (highlightedSpan) {
          highlightedSpan.classList.remove('highlight');
        }

        // Highlight the clicked span
        target.classList.add('highlight');
        setHighlightedSpan(target);
      }
    };

    const container = viewerRef.current;
    container.addEventListener('click', handleDocumentClick);

    return () => {
      container.removeEventListener('click', handleDocumentClick);
    };
  }, [highlightedSpan]);

  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column' }}>
      <div ref={viewerRef} style={{ flex: 1, overflow: 'auto' }}>
        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`}>
          <Viewer
            fileUrl="./example_research_paper.pdf"
            plugins={[defaultLayoutPluginInstance]}
          />
        </Worker>
      </div>
    </div>
  );
};

export default PDFViewer;

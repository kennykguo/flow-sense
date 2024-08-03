import React, { useState, useEffect } from 'react';

const HighlightTracker: React.FC = () => {
  const [highlight, setHighlight] = useState<string>('');

  useEffect(() => {
    const handleMouseUp = () => {
      const selection = window.getSelection();
      if (selection?.toString()) {
        setHighlight(selection.toString());
      }
    };

    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd' }}>
      <h2>Select some text below:</h2>
      <p>
        This is some example text. Try selecting different parts of this paragraph to see how it works. The selected text will appear below.
      </p>
      <p>
        You can also select text from other areas of this page to see how the component updates.
      </p>
      <div style={{ marginTop: '20px' }}>
        <strong>Selected Text:</strong>
        <div style={{ border: '1px solid #ddd', padding: '10px', marginTop: '5px' }}>
          {highlight ? highlight : 'No text selected'}
        </div>
      </div>
    </div>
  );
};

export default HighlightTracker;

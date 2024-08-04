import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Import your JSON file
import codeSnippetsJson from './pytorch_code_snippets.json';

// Define the type for a single code snippet
interface CodeSnippet {
  code: string;
}

// Define the type for the entire JSON structure
interface CodeSnippetsData {
  code_snippets: CodeSnippet[];
}

// Type assertion for the imported JSON
const codeSnippets = codeSnippetsJson as CodeSnippetsData;

const CodeSnippetDisplay: React.FC = () => {
  return (
    <div>
      {codeSnippets.code_snippets.map((snippet: CodeSnippet, index: number) => (
        <div key={index}>
          <SyntaxHighlighter language="python" style={solarizedlight}>
            {snippet.code}
          </SyntaxHighlighter>
        </div>
      ))}
    </div>
  );
};

export default CodeSnippetDisplay;
import React, { useRef, useState, useEffect } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import * as pdfjsLib from 'pdfjs-dist';
import api from '../api'; // Ensure this points to your API utility
import '../styles/Home.css';

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught in ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

const PDFViewer = () => {
  const viewerRef = useRef(null);
  const [highlightedSpan, setHighlightedSpan] = useState(null);
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [gptResponse, setGptResponse] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [uploadedPapers, setUploadedPapers] = useState([]);
  const [selectedPaperId, setSelectedPaperId] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    const handleTextDoubleClick = async (event) => {
      const target = event.target;

      if (target && target.classList.contains('rpv-core__text-layer-text')) {
        if (highlightedSpan) {
          highlightedSpan.classList.remove('highlight');
        }

        target.classList.add('highlight');
        setHighlightedSpan(target);

        const currentText = target.textContent;

        console.log('Highlighted text:', currentText);

        try {
          const response = await api.post('/api/explain/', { current_text: currentText });
          setGptResponse(response.data.explanation);
        } catch (err) {
          console.error('Error during API request:', err);
          alert('Failed to get explanation.');
        }
      }
    };

    const container = viewerRef.current;
    container.addEventListener('dblclick', handleTextDoubleClick);

    return () => {
      container.removeEventListener('dblclick', handleTextDoubleClick);
    };
  }, [highlightedSpan]);

  useEffect(() => {
    getNotes();
    fetchUploadedPapers();
  }, []);

  useEffect(() => {
    if (selectedPaperId) {
      fetchComments(selectedPaperId);
    }
  }, [selectedPaperId]);

  const getNotes = () => {
    api.get('/api/notes/')
      .then((res) => setNotes(res.data))
      .catch((err) => alert('Failed to fetch notes.'));
  };

  const fetchUploadedPapers = () => {
    api.get('/api/papers/')
      .then((res) => {
        console.log('Fetched papers:', res.data); // Debugging line
        setUploadedPapers(res.data);
      })
      .catch((err) => alert('Failed to fetch papers.'));
  };

  const fetchComments = (paperId) => {
    api.get(`/api/papers/${paperId}/comments/`)
      .then((res) => setComments(res.data))
      .catch((err) => alert('Failed to fetch comments.'));
  };

  const createNote = (e) => {
    e.preventDefault();
    api.post('/api/notes/', { content: note, title })
      .then((res) => {
        if (res.status === 201) {
          alert('Note created!');
          getNotes();
        } else {
          alert('Failed to create note.');
        }
      })
      .catch((err) => alert('Failed to create note.'));
  };

  const deleteNote = (id) => {
    api.delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          alert('Note deleted!');
          getNotes();
        } else {
          alert('Failed to delete note.');
        }
      })
      .catch((err) => alert('Failed to delete note.'));
  };

  const createComment = (e) => {
    e.preventDefault();
    api.post(`/api/papers/${selectedPaperId}/comments/`, { content: comment })
      .then((res) => {
        if (res.status === 201) {
          alert('Comment created!');
          fetchComments(selectedPaperId);
        } else {
          alert('Failed to create comment.');
        }
      })
      .catch((err) => alert('Failed to create comment.'));
  };

  const deleteComment = (id) => {
    api.delete(`/api/comments/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          alert('Comment deleted!');
          fetchComments(selectedPaperId);
        } else {
          alert('Failed to delete comment.');
        }
      })
      .catch((err) => alert('Failed to delete comment.'));
  };

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
        setPdfFile(URL.createObjectURL(file)); // Creates a temporary URL for file preview
        const formData = new FormData();
        formData.append('file', file);

        api.post('/api/upload/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // Ensure correct content type
            }
        })
        .then((res) => {
            if (res.status === 200) {
                fetchUploadedPapers(); // Fetch updated list of papers after upload
            } else {
                alert('Failed to upload PDF.');
            }
        })
        .catch((err) => alert('Failed to upload PDF.'));
    } else {
        alert('Please upload a valid PDF file.');
    }
  };

  return (
    <ErrorBoundary>
      <div style={{ height: '100vh', width: '100vw', display: 'flex' }}>
        <div
          ref={viewerRef}
          style={{ flex: 1, overflow: 'auto', position: 'relative' }}
        >
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            style={{ margin: '10px', display: 'block' }}
          />
          {pdfFile && (
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`}>
              <Viewer fileUrl={pdfFile} plugins={[defaultLayoutPluginInstance]} />
            </Worker>
          )}
        </div>
        <div style={{ width: '300px', padding: '20px' }}>
          <h2>Notes</h2>
          <form onSubmit={createNote}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: '100%', marginBottom: '10px' }}
            />
            <textarea
              placeholder="Note content"
              value={note}
              onChange={handleNoteChange}
              style={{ width: '100%', height: '100px', marginBottom: '10px' }}
            />
            <button type="submit">Create Note</button>
          </form>
          {notes.map((note) => (
            <div key={note.id}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <button onClick={() => deleteNote(note.id)}>Delete Note</button>
            </div>
          ))}
          <h2>Uploaded Papers</h2>
          {uploadedPapers.length > 0 ? (
            uploadedPapers.map((paper) => (
              <div key={paper.id} style={{ margin: '10px', width: '200px' }}>
                <a href={paper.file} target="_blank" rel="noopener noreferrer">
                  <img src={paper.banner_url} alt={paper.title} style={{ width: '100%', height: 'auto' }} />
                </a>
                <p>{paper.title}</p>
                <button onClick={() => setSelectedPaperId(paper.id)}>View Comments</button>
              </div>
            ))
          ) : (
            <p>No papers uploaded yet.</p>
          )}
          {selectedPaperId && (
            <div>
              <h2>Comments for Paper {selectedPaperId}</h2>
              <form onSubmit={createComment}>
                <textarea
                  placeholder="Add a comment"
                  value={comment}
                  onChange={handleCommentChange}
                  style={{ width: '100%', height: '100px', marginBottom: '10px' }}
                />
                <button type="submit">Add Comment</button>
              </form>
              {comments.map((comment) => (
                <div key={comment.id}>
                  <p>{comment.content}</p>
                  <button onClick={() => deleteComment(comment.id)}>Delete Comment</button>
                </div>
              ))}
            </div>
          )}
          {gptResponse && (
            <div>
              <h2>GPT Explanation</h2>
              <p>{gptResponse}</p>
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default PDFViewer;

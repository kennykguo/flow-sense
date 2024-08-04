import React, { useEffect, useRef, useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import * as pdfjsLib from "pdfjs-dist";
import api from "../api"; // Import the API utility
import "../styles/Home.css"; // Import CSS file for highlighting
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import logo from "/logo.png";

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;

const PDFViewer = () => {
  const navigate = useNavigate();
  const viewerRef = useRef(null);
  const [highlightedSpan, setHighlightedSpan] = useState(null);
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [gptResponse, setGptResponse] = useState("");
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    const handleTextDoubleClick = async (event) => {
      const target = event.target;

      // Check if the double-clicked element is a text span
      if (target && target.classList.contains("rpv-core__text-layer-text")) {
        // Remove highlight from previously highlighted span
        if (highlightedSpan) {
          highlightedSpan.classList.remove("highlight");
        }

        // Highlight the clicked span
        target.classList.add("highlight");
        setHighlightedSpan(target);

        // Get the current highlighted text
        const currentText = target.textContent;

        // Debugging output
        console.log("Highlighted text:", currentText);

        // Send data to the backend
        try {
          const response = await api.post("/api/explain/", {
            current_text: currentText,
          });
          setGptResponse(response.data.explanation);
        } catch (err) {
          console.error("Error during API request:", err);
          alert("Failed to get explanation.");
        }
      }
    };

    const container = viewerRef.current;
    container.addEventListener("dblclick", handleTextDoubleClick);

    return () => {
      container.removeEventListener("dblclick", handleTextDoubleClick);
    };
  }, [highlightedSpan]);

  useEffect(() => {
    // Fetch existing notes from the backend when the component mounts
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => setNotes(res.data))
      .catch((err) => alert(err));
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content: note, title })
      .then((res) => {
        if (res.status === 201) {
          getNotes(); // Refresh the notes list
        } else {
          alert("Failed to create note.");
        }
      })
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          getNotes(); // Refresh the notes list
        } else {
          alert("Failed to delete note.");
        }
      })
      .catch((err) => alert(err));
  };

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  return (
    <div style={{ height: "100vh", width: "100vw", display: "flex" }}>
      <div
        ref={viewerRef}
        style={{ flex: 1, overflow: "auto", position: "relative" }}
      >
        <Worker
          workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`}
        >
          <Viewer
            fileUrl="./example_research_paper.pdf"
            plugins={[defaultLayoutPluginInstance]}
          />
        </Worker>
      </div>

      <StyledContainer>
        <div className="button-container">
          <button onClick={() => navigate("/landing")}>
            <img src={logo} alt="logo" />
            FlowSense
          </button>
        </div>

        <h3>Create a Note</h3>
        <form onSubmit={createNote}>
          <label htmlFor="title">Title:</label>
          <br />
          <input
            type="text"
            id="title"
            name="title"
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <label htmlFor="content">Content:</label>
          <br />
          <textarea
            id="content"
            name="content"
            required
            value={note}
            onChange={handleNoteChange}
            style={{ width: "100%", height: "150px" }}
          ></textarea>
          <br />
          <input type="submit" value="Submit" />
        </form>

        {gptResponse && (
          <div style={{ marginTop: "20px" }}>
            <h3>GPT Explanation</h3>
            <p>{gptResponse}</p>
          </div>
        )}

        <h3>Existing Notes</h3>
        <div className="note-container">
          {notes.map((note) => (
            <StyledNote key={note.id}>
              <h2>{note.title}</h2>
              <h3>{note.content}</h3>
              <div className="delete-button-contain">
                <button onClick={() => deleteNote(note.id)}>Delete</button>
              </div>
            </StyledNote>
          ))}
        </div>
      </StyledContainer>
    </div>
  );
};

export default PDFViewer;

const StyledContainer = styled.div`
  width: 300px;
  padding: 15px;
  border-left: 1px solid #ddd;
  background: #f5f5f5;
  overflow: auto;

  .button-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 20px;
    border-bottom: 1px solid black;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;

      img {
        width: 45px;
      }
      border: none;
      background: none;
      font-size: 30px;
      color: linear-gradient(
        to right,
        rgba(34, 193, 195, 0.7),
        rgba(253, 187, 45, 0.7)
      );

      &:hover {
        cursor: pointer;
      }
    }
  }

  .note-container {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    gap: 12px;
    padding-left: 15px;
    padding-right: 15px;

    .delete-button-contain {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 16px;

      button {
        background: #dc3545;
        color: white;
        border: none;
        border-radius: 5px;

        &:hover {
          cursor: pointer;
        }
      }
    }
  }
`;

const StyledNote = styled.div`
  width: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h2 {
    margin-top: 0;
    margin-bottom: 5px;
    text-align: center;
  }

  h3 {
    font-size: 14px;
    font-weight: 400;
  }
`;

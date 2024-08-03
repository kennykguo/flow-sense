import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import HierarchyTree from './HierarchyTree';
import CodeSnippetDisplay from "./CodeSnippetDisplay";
import HighlightTracker from './HighlightTracker';
import PDFViewer from "./PDFViewer";

function App() {
  return (
    <>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <div className="App">
                {/* <h1>Concept Hierarchy Visualizer</h1> */}
                {/* <HierarchyTree /> */}
                {/* <CodeSnippetDisplay /> */}
                {/* <HighlightTracker /> */}
                <PDFViewer/>
              </div>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;

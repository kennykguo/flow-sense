import React, { useEffect, useState } from "react";
import { getPdfData } from "./pdfService";
import { SentenceData, Word } from "../../../types/pdfTypes";

function PdfViewer() {
  const [pdfData, setPdfData] = useState<SentenceData[]>([]);

  useEffect(() => {
    const fetchPdfData = async () => {
      const data = await getPdfData();
      setPdfData(data.data);
      console.log(pdfData);
    };

    fetchPdfData();
  }, []);

    const firstPageData = pdfData.length > 0 ? pdfData[0].sentences : [];

  return (
    <div>
      {firstPageData.map((sentence, index) => (
        <div key={index} style={{ position: "relative" }}>
          {sentence.map((word: Word, idx: number) => (
            <div
              key={idx}
              style={{
                position: "absolute",
                left: `${word.x0}px`,
                top: `${word.y0}px`,
                width: `${word.x1 - word.x0}px`,
                height: `${word.y1 - word.y0}px`,
                border: "1px solid red",
                backgroundColor: "rgba(255, 0, 0, 0.2)",
              }}
            >
              {word.text}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default PdfViewer;

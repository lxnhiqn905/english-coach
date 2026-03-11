"use client";

import { useState, useRef, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface Props {
  url: string;
}

export default function PdfViewer({ url }: Props) {
  const [numPages, setNumPages] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(600);

  const onContainerRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      setWidth(node.clientWidth);
    }
  }, []);

  return (
    <div ref={onContainerRef} className="w-full">
      {loading && (
        <div className="flex items-center justify-center py-16 text-slate-400 text-sm">
          Đang tải PDF...
        </div>
      )}
      <Document
        file={url}
        onLoadSuccess={({ numPages }) => {
          setNumPages(numPages);
          setLoading(false);
        }}
        onLoadError={() => setLoading(false)}
        loading=""
      >
        {Array.from({ length: numPages }, (_, i) => (
          <div key={i} className={`mb-2 ${i === 0 ? "" : ""}`}>
            <Page
              pageNumber={i + 1}
              width={width || 600}
              renderAnnotationLayer={false}
              renderTextLayer={false}
            />
          </div>
        ))}
      </Document>
    </div>
  );
}

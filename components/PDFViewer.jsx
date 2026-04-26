'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  ZoomIn,
  ZoomOut,
  Download,
  Loader2,
  FileX,
  Maximize2
} from 'lucide-react';

export default function PDFViewer({ fileUrl, title = "ملف PDF" }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [PDFComponents, setPDFComponents] = useState(null);

  useEffect(() => {
    import('react-pdf').then((mod) => {
      mod.pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${mod.pdfjs.version}/build/pdf.worker.min.js`;
      setPDFComponents({ Document: mod.Document, Page: mod.Page });
    });
  }, []);

  const onDocumentLoadSuccess = useCallback(({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
    setError(false);
  }, []);

  const onDocumentLoadError = useCallback(() => {
    setLoading(false);
    setError(true);
  }, []);

  const goToPrevPage = () => setPageNumber(prev => Math.max(prev - 1, 1));
  const goToNextPage = () => setPageNumber(prev => Math.min(prev + 1, numPages));
  const zoomIn = () => setScale(prev => Math.min(prev + 0.2, 2.5));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));

  return (
    <div className={`flex flex-col bg-gray-100 rounded-2xl overflow-hidden shadow-xl
      ${fullscreen ? 'fixed inset-0 z-50 rounded-none' : 'w-full'}`}>

      {/* شريط الأدوات العلوي */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white px-4 py-3
        flex items-center justify-between flex-wrap gap-2">

        <div className="flex items-center gap-2 font-semibold text-sm truncate max-w-xs">
          <span>📄</span>
          <span>{title}</span>
        </div>

        <div className="flex items-center gap-1">
          <button onClick={goToNextPage} disabled={pageNumber >= numPages}
            className="p-2 rounded-lg hover:bg-white/20 disabled:opacity-30 transition">
            <ChevronRight size={18} />
          </button>

          <span className="text-sm bg-white/20 px-3 py-1 rounded-lg min-w-[80px] text-center">
            {pageNumber} / {numPages || '...'}
          </span>

          <button onClick={goToPrevPage} disabled={pageNumber <= 1}
            className="p-2 rounded-lg hover:bg-white/20 disabled:opacity-30 transition">
            <ChevronLeft size={18} />
          </button>

          <div className="w-px h-6 bg-white/30 mx-1" />

          <button onClick={zoomIn} disabled={scale >= 2.5}
            className="p-2 rounded-lg hover:bg-white/20 disabled:opacity-30 transition">
            <ZoomIn size={18} />
          </button>

          <span className="text-sm bg-white/20 px-2 py-1 rounded-lg min-w-[50px] text-center">
            {Math.round(scale * 100)}%
          </span>

          <button onClick={zoomOut} disabled={scale <= 0.5}
            className="p-2 rounded-lg hover:bg-white/20 disabled:opacity-30 transition">
            <ZoomOut size={18} />
          </button>

          <div className="w-px h-6 bg-white/30 mx-1" />

          <a href={fileUrl} download
            className="p-2 rounded-lg hover:bg-white/20 transition">
            <Download size={18} />
          </a>

          </div>

      </div>
    </div>
  );
}
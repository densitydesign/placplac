import { useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export const PDFViewer = ({
  url,
  single = false,
}: {
  url: string;
  single?: boolean;
}) => {
  const [numPages, setNumPages] = useState<number>();
  const [zoom, setZoom] = useState(1.0);
  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }
  const zoomIn = () => setZoom((zoom) => zoom + 1.0);
  const zoomOut = () =>
    setZoom((zoom) => {
      if (zoom - 1.0 <= 0) return 1.0;
      return zoom - 1.0;
    });
  const resetTransform = () => setZoom(1.0);
  const buttonStyling = {
    border: '1px solid black',
    background: 'white',
    padding: '0px 10px',
    marginRight: '10px',
    fontSize: '2rem',
  };
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
      }}
    >
      {!single && (
        <div
          style={{
            position: 'absolute',
            left: '0',
            right: '0',
            textAlign: 'center',
            zIndex: '100',
            bottom: '10px',
            background: '#00000073',
            padding: '5px',
            borderRadius: '13px',
          }}
        >
          <button style={buttonStyling} onClick={() => zoomIn()}>
            +
          </button>
          <button
            style={{
              ...buttonStyling,
              ...(zoom === 1.0 ? { opacity: 0.7 } : {}),
            }}
            onClick={() => zoomOut()}
          >
            -
          </button>
          <button style={buttonStyling} onClick={() => resetTransform()}>
            x
          </button>
        </div>
      )}
      <div className="PDFContainer">
        <Document
          className={'PDFDocument'}
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {single ? (
            <Page
              className={'PDFPage PDFPageOne'}
              scale={zoom}
              height={600}
              pageNumber={1}
            />
          ) : (
            Array.from(new Array(numPages), (el, index) => (
              <Page
                className={'PDFPage'}
                scale={zoom}
                height={600}
                key={`page_${index + 1}`}
                pageNumber={index + 1}
              />
            ))
          )}
        </Document>
      </div>
    </div>
  );
};

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

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }
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
      }}
    >
      <TransformWrapper wheel={{ disabled: true }} pinch={{ disabled: true }}>
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <>
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
                  margin: '10px',
                  padding: '5px',
                  borderRadius: '13px',
                }}
              >
                <button style={buttonStyling} onClick={() => zoomIn()}>
                  +
                </button>
                <button style={buttonStyling} onClick={() => zoomOut()}>
                  -
                </button>
                <button style={buttonStyling} onClick={() => resetTransform()}>
                  x
                </button>
              </div>
            )}
            <TransformComponent
              wrapperStyle={{ width: '100%', height: '100%', overflow: 'auto' }}
              contentStyle={{ width: '100%', justifyContent: 'center' }}
            >
              <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
                {single ? (
                  <Page height={600} pageNumber={1} />
                ) : (
                  Array.from(new Array(numPages), (el, index) => (
                    <Page
                      height={600}
                      key={`page_${index + 1}`}
                      pageNumber={index + 1}
                    />
                  ))
                )}
              </Document>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
};

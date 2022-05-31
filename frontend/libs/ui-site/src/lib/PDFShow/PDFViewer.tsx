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

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <TransformWrapper pinch={{ disabled: true }}>
        <TransformComponent>
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
      </TransformWrapper>
    </div>
  );
};

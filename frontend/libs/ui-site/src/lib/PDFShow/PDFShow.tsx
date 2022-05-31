import React from 'react';
import Modal from 'react-modal';
import { DoubleClickContainer } from '../components/DoubleClickContainer';
import { FullScreenModal } from '../components/FullScreenModal';
import { PDFViewer } from './PDFViewer';

interface SigmaShowProps {
  pdfUrl: string;
}

export const PDFShow = (props: SigmaShowProps) => {
  const { pdfUrl } = props;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <DoubleClickContainer height={'600px'} onDoubleClick={openModal}>
        <PDFViewer single url={pdfUrl} />
      </DoubleClickContainer>
      <FullScreenModal isOpen={modalIsOpen} onClose={closeModal}>
        <PDFViewer url={pdfUrl} />
      </FullScreenModal>
    </>
  );
};

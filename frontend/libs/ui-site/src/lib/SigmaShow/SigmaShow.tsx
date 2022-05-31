import React from 'react';
import Modal from 'react-modal';
import { DoubleClickContainer } from '../components/DoubleClickContainer';
import { FullScreenModal } from '../components/FullScreenModal';
import { SigmaGraph } from './views/SigmaGraph';
interface SigmaShowProps {
  gexfPath: string;
  height?: string;
}
Modal.setAppElement('#root');
export const SigmaShow = (props: SigmaShowProps) => {
  const { gexfPath, height } = props;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <DoubleClickContainer height={height} onDoubleClick={openModal}>
        <SigmaGraph hasControls={false} gexfPath={gexfPath} />
      </DoubleClickContainer>
      <FullScreenModal isOpen={modalIsOpen} onClose={closeModal}>
        <SigmaGraph gexfPath={gexfPath} />
      </FullScreenModal>
    </>
  );
};

import React, { ReactNode } from 'react';
import Modal from 'react-modal';
import styles from './FullScreenModal.module.css';
interface FullScreenModalProps {
  onClose: () => void;
  isOpen: boolean;
  children: ReactNode;
}
export const FullScreenModal = (props: FullScreenModalProps) => {
  const { onClose, isOpen, children } = props;
  return (
    <Modal
      shouldCloseOnEsc
      isOpen={isOpen}
      style={{ overlay: { zIndex: 10 } }}
      onRequestClose={onClose}
    >
      <button className={styles.close_button} onClick={onClose}>
        Close
      </button>
      {children}
    </Modal>
  );
};

import React from "react";
import { Sigma, LoadGEXF } from "react-sigma";
import styles from "./SigmaShow.module.css";
import Modal from "react-modal";
import { DoubleClickContainer } from "../components/DoubleClickContainer";
import { FullScreenModal } from "../components/FullScreenModal";
interface SigmaShowProps {
  gexfPath: string;
  height?: string;
}
Modal.setAppElement("#root");
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
        <Sigma renderer="canvas" style={{ width: "100%", height: "100%" }}>
          <LoadGEXF path={gexfPath} />
        </Sigma>
      </DoubleClickContainer>
      <FullScreenModal isOpen={modalIsOpen} onClose={closeModal}>
        <Sigma renderer="canvas" style={{ width: "100%", height: "100%" }}>
          <LoadGEXF path={gexfPath} />
        </Sigma>
      </FullScreenModal>
    </>
  );
};

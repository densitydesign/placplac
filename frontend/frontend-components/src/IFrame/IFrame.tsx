import React from "react";
import Modal from "react-modal";
import { DoubleClickContainer } from "../components/DoubleClickContainer";
import { FullScreenModal } from "../components/FullScreenModal";
interface IFrameProps
  extends React.DetailedHTMLProps<
    React.IframeHTMLAttributes<HTMLIFrameElement>,
    HTMLIFrameElement
  > {}
export const IFrame = (props: IFrameProps) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <>
      <DoubleClickContainer
        height={props.height as string}
        onDoubleClick={openModal}
      >
        <iframe {...props} width={"100%"} />
      </DoubleClickContainer>

      <FullScreenModal isOpen={modalIsOpen} onClose={closeModal}>
        <iframe {...props} height={"100%"} width={"100%"} />
      </FullScreenModal>
    </>
  );
};

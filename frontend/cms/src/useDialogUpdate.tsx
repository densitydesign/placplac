import { useEffect, useState } from "react";
import { useToggler } from "./useToggler";

export function useDialoglUpdate<T>() {
  const {
    value: isOpenUpdateModal,
    toggle: toggleUpdateModal,
    setTrue: openModalUpdate,
    setFalse: closeModalUpdate,
  } = useToggler();
  const [activeItem, setActiveItem] = useState<T>();

  useEffect(() => {
    if (activeItem !== undefined) openModalUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeItem]);

  useEffect(() => {
    if (!isOpenUpdateModal) setActiveItem(undefined);
  }, [isOpenUpdateModal]);
  return {
    activeItem,
    setActiveItem,
    isOpenUpdateModal,
    toggleUpdateModal,
    openModalUpdate,
    closeModalUpdate,
  };
}

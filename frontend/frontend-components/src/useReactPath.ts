import React from "react";

export const useReactHash = () => {
  const [path, setPath] = React.useState(window.location.hash);
  const listenToPopstate = () => {
    const winPath = window.location.hash;
    console.log("window.locartion.hash", window.location.hash);
    setPath(winPath);
  };
  React.useEffect(() => {
    window.addEventListener("hashchange", listenToPopstate);
    return () => {
      window.removeEventListener("hashchange", listenToPopstate);
    };
  }, []);
  return path;
};

import "./App.css";
import { useContext, useEffect, useRef } from "react";
import { SavedPhotosContext } from "./imageContext";
import createImageList from "./createImageList";

export default function SavedPhotos() {
  const context = useContext(SavedPhotosContext);
  const savedPhotos = context.savedPhotos;
  const show = context.showSaved;
  const setShow = context.setShowSaved;
  let lightBoxRef = useRef(null);

  const listItems = createImageList(savedPhotos, "saved");

  useEffect(() => {
    let handler = (event: MouseEvent) => {
      if (lightBoxRef.current === event.target) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  if (show === true) {
    return (
      <div className="container lightbox" ref={lightBoxRef}>
        <div className="savedPhotos">{listItems}</div>
      </div>
    );
  }
}

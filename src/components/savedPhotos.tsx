import savedPhotosStyles from "../styling/savedPhotos.module.css";
import { useContext, useEffect, useRef } from "react";
import { SavedPhotosContext } from "../functionality/context/imageContext";
import createImageList from "../functionality/createImageList";

export default function SavedPhotos() {
  const context = useContext(SavedPhotosContext);
  const savedPhotos = context.savedPhotos;
  const show = context.showSaved;
  const setShow = context.setShowSaved;
  let lightBoxRef = useRef(null);

  const listItems = createImageList(savedPhotos, true);

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
      <div
        className={`${savedPhotosStyles.container} ${savedPhotosStyles.lightbox}`}
        ref={lightBoxRef}
      >
        <div className={savedPhotosStyles.savedPhotos}>{listItems}</div>
      </div>
    );
  }
}

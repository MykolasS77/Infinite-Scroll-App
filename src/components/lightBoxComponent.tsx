import lightBoxStyles from "../styling/onDisplayEffects.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { SavedPhotosContext } from "../functionality/context/imageContext";

export default function LightBox() {
  const context = useContext(SavedPhotosContext);
  const display = context.setShowPicture;
  const [loading, setLoading] = useState(lightBoxStyles.loading);
  let lightBoxRef = useRef(null);

  const loadHandler = () => {
    setLoading(lightBoxStyles.fadeIn);
  };

  useEffect(() => {
    let handler = (event: MouseEvent) => {
      if (lightBoxRef.current === event.target) {
        display(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  if (context.showPicture === true) {
    return (
      <div className={lightBoxStyles.lightbox} ref={lightBoxRef}>
        <img
          className={`${loading} ${lightBoxStyles.active}`}
          src={context.pictureURL}
          onLoad={loadHandler}
        ></img>
      </div>
    );
  }
}

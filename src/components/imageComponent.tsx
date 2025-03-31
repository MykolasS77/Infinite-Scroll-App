import { useState } from "react";
import imageStyles from "../styling/imageComponent.module.css";
import displayEffectStyles from "../styling/onDisplayEffects.module.css";
import { useContext } from "react";
import { SavedPhotosContext } from "../functionality/context/imageContext";

export default function ImageComponent(props: any) {
  const [loading, setLoading] = useState("loading");
  const [blur, setBlur] = useState("");

  const context = useContext(SavedPhotosContext);
  const items = context.savedPhotos;
  const setItems = context.setSavedPhotos;
  const setPictureURL = context.setPictureURL;
  const displayOn = context.setShowPicture;
  const setShowSaved = context.setShowSaved;

  const loadHandler = () => {
    setLoading(displayEffectStyles.fadeIn);
  };

  const hooverHandler = () => {
    setBlur(imageStyles.hoover);
  };

  const leaveHandler = () => {
    setBlur("");
  };

  const savePhoto = () => {
    const newArray = [...items, props.wholeData];
    const filteredArray = [...new Set(newArray)];
    window.localStorage.setItem("saved_photos", JSON.stringify(filteredArray));
    setItems(filteredArray);
  };

  const displayPhoto = (event: React.MouseEvent) => {
    const type = event.target as HTMLElement;

    if (type.tagName.toLowerCase() === "button") {
      return;
    }

    leaveHandler();

    if (props.type === "saved") {
      setShowSaved((prevState) => !prevState);
    }

    setPictureURL(props.src.original);
    displayOn((prevState) => !prevState);
  };

  const deletePhoto = () => {
    const newList = items.filter((a) => a !== props.wholeData);
    setItems(newList);
    window.localStorage.setItem("saved_photos", JSON.stringify(newList));
  };

  const returnImageComponent = (
    buttonText: string,
    buttonClickFunction: () => void
  ) => {
    return (
      <div
        className={blur}
        onMouseEnter={hooverHandler}
        onMouseLeave={leaveHandler}
      >
        {blur === imageStyles.hoover ? (
          <div onClick={displayPhoto}>
            <div className={imageStyles.imageInfo}>
              <h4>{props.imageName}</h4>
            </div>

            <div className={imageStyles.authorNameContainer}>
              <div className={imageStyles.line}></div>
              <p className={imageStyles.authorName}>{props.author}</p>

              <button onClick={buttonClickFunction}>{buttonText}</button>
            </div>
          </div>
        ) : null}
        <img
          key={props.id}
          className={loading}
          src={props.src.large}
          height={"300px"}
          loading="lazy"
          onLoad={loadHandler}
        />
      </div>
    );
  };

  if (props.type === "saved") {
    return returnImageComponent("Delete", deletePhoto);
  } else {
    return returnImageComponent("Save", savePhoto);
  }
}

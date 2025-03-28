import { useState } from "react";
import "./App.css";
import { useContext } from "react";
import { SavedPhotosContext } from "./imageContext";

export default function imageComponent(props: any) {
  //padaryt interface

  const [loading, setLoading] = useState("loading");
  const [blur, setBlur] = useState("");

  const context = useContext(SavedPhotosContext);
  const items = context.savedPhotos;
  const setItems = context.setSavedPhotos;
  const setPictureURL = context.setPictureURL;
  const displayOn = context.setShowPicture;
  const setShowSaved = context.setShowSaved;

  const loadHandler = () => {
    setLoading("fade-in");
  };

  const hooverHandler = () => {
    setBlur("hoover");
  };

  const leaveHandler = () => {
    setBlur("");
  };

  const savePhoto = () => {
    if (items.length === 0) {
      setItems([props.wholeData]);
      window.localStorage.setItem(
        "saved_photos",
        JSON.stringify([props.wholeData])
      );
    } else {
      const newArray = [...items, props.wholeData];
      const filteredArray = [...new Set(newArray)];
      window.localStorage.setItem(
        "saved_photos",
        JSON.stringify(filteredArray)
      );
      setItems(filteredArray);
    }
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
        {blur === "hoover" ? (
          <div onClick={displayPhoto}>
            <div className="imageInfo">
              <h4>{props.imageName}</h4>
            </div>

            <div className="authorNameContainer">
              <div className="line"></div>
              <p className="authorName">{props.author}</p>

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

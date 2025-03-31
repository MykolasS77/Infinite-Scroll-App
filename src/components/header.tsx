import headerStyles from "../styling/header.module.css";
import { useContext } from "react";
import { SavedPhotosContext } from "../functionality/context/imageContext";
import SaveIcon from "../styling/assets/saveIcon";

export default function Header() {
  const context = useContext(SavedPhotosContext);
  const length = context.savedPhotos.length;
  const setShow = context.setShowSaved;

  const showSavedPictures = () => {
    if (length != 0) {
      setShow((prevState) => !prevState);
    }
  };

  const iconContainer = (length: number) => {
    return (
      <div className={headerStyles.iconContainer}>
        <SaveIcon onClickFunction={showSavedPictures} />
        {length > 0 ? (
          <div className={headerStyles.savedItemsNumber}>
            <h2>{length}</h2>
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <header>
      <div></div>
      <h1>Infinite scroll app. Made by Mykolas Saugūnas.</h1>
      {iconContainer(length)}
    </header>
  );
}

import "./App.css";
import { Photo } from "pexels";
import ImageComponent from "./imageComponent";
import formatPictureNameFromURL from "./formatPictureNameFromURL";

export default function createImageList(dataFromAPI: Photo[], type?: string) {
  const listItems = dataFromAPI.map((item: any) => {
    let pictureName = item.alt;
    if (pictureName === "") {
      pictureName = formatPictureNameFromURL(item);
    }
    return (
      <ImageComponent
        key={item.id}
        id={item.id}
        author={item.photographer}
        imageName={pictureName}
        src={item.src}
        isLoading={false}
        wholeData={item}
        type={type}
      />
    );
  });
  return listItems;
}

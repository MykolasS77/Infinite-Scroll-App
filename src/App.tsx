import { useContext, useEffect, useState } from "react";
import { SavedPhotosContext } from "./functionality/context/imageContext";
import Header from "./components/Header";
import LightBox from "./components/LightBoxComponent";
import SavedPhotos from "./components/SavedPhotos";
import createImageList from "./functionality/createImageList";
import picturesGrid from "./styling/picturesGrid.module.css";

export default function App() {
  const context = useContext(SavedPhotosContext);
  const dataFromAPI = context.data;
  const setDataFromAPI = context.setData;
  const [pageNumber, setPageNumber] = useState(1);
  const linkToAPI = `https://api.pexels.com/v1/curated/?page=${pageNumber}&per_page=80`;
  const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

  const fetchPhotos = async (link: string) => {
    try {
      const imageRequest = await fetch(link, {
        headers: {
          Authorization: API_KEY,
        },
      });
      const response = await imageRequest.json();
      const responseArray = response.photos;

      setDataFromAPI((prev) => {
        const unsortedArray = [...prev, ...responseArray];
        const sortedArray = unsortedArray.filter(
          (element, index, arr) =>
            arr.findIndex(
              (item) => JSON.stringify(item) === JSON.stringify(element)
            ) === index
        );

        return sortedArray;
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPhotos(linkToAPI);
  }, [pageNumber]);

  useEffect(() => {
    const loadPicturesOnBottom = () => {
      if (
        document.documentElement.scrollTop +
          document.documentElement.clientHeight >=
        document.documentElement.scrollHeight - 50
      ) {
        setPageNumber((prev) => {
          return prev + 1;
        });
      }
    };

    window.addEventListener("scroll", loadPicturesOnBottom);

    return () => {
      window.removeEventListener("scroll", loadPicturesOnBottom);
    };
  }, []);

  const listItems = createImageList(dataFromAPI, false);

  return (
    <>
      <LightBox />
      <SavedPhotos />
      <Header />
      <div className={picturesGrid.container}>
        <div className={picturesGrid.pictures}>{listItems}</div>
      </div>
    </>
  );
}

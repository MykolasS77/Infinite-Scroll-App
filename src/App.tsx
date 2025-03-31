import { useContext, useEffect, useState } from "react";
import { SavedPhotosContext } from "./functionality/context/imageContext";
import Header from "./components/header";
import LightBox from "./components/lightBoxComponent";
import SavedPhotos from "./components/savedPhotos";
import createImageList from "./functionality/createImageList";
import picturesGrid from "./styling/picturesGrid.module.css";

export default function App() {
  const context = useContext(SavedPhotosContext);
  const dataFromAPI = context.data;
  const setDataFromAPI = context.setData;
  const [pageNumber, setPageNumber] = useState(1);
  const linkToAPI = `https://api.pexels.com/v1/curated/?page=${pageNumber}&per_page=80`;

  const fetchPhotos = async (link: string) => {
    try {
      const imageRequest = await fetch(link, {
        headers: {
          Authorization:
            "tIdg0aIl0BHqckWvn7Uw4OlxrtmPJOnRSvL71vmRTBicZ20QZtZhnkb1",
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
        document.documentElement.scrollHeight -
          document.documentElement.scrollTop <=
        document.documentElement.clientHeight
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

  const listItems = createImageList(dataFromAPI);

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

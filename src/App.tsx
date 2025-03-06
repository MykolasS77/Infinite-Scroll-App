import "./App.css"
import { createClient} from "pexels";
import { useEffect, useState, useContext } from "react";
import { Photos } from "pexels";
import ImageComponent from "./imageComponent";
import {SavedPhotosContextProvider} from "./Context"
import {SavedPhotosContext} from "./Context"
import Header from "./header";
import LightBox from "./lightBoxComponent";
import SavedPhotos from "./savedPhotos";

export default function App() {
  const client = createClient(
    "tIdg0aIl0BHqckWvn7Uw4OlxrtmPJOnRSvL71vmRTBicZ20QZtZhnkb1"
  );

  const [data, setData] = useState<Photos["photos"] | []>([]);
  const [pageNumber, setPageNumber] = useState(1)
  const context = useContext(SavedPhotosContext)


  const loadPhotos = () => {

    client.photos.curated({ page: pageNumber, per_page: 80 }).then((response) => {

      if("error" in response){
        console.log(response.error)
      }
      else{
        const responseArray = response.photos

        if(data.length === 0) {
          setData(responseArray)
        }
        else{
          setData((prev) => [...prev, ...responseArray])
        }
        
      }
    });

  }

  useEffect(() => {
    loadPhotos()

    addEventListener("scroll", () => {
    
      if(document.documentElement.scrollTop + 1 + window.innerHeight > document.documentElement.scrollHeight){ 
            setPageNumber((prev) => {
            return prev + 1
          })
             
      };
    });
    
  }, [pageNumber]);
  
  if (Object.keys(data).length > 0) {
    const listItems = data.map((item) => {

      return (
      <ImageComponent
      key={item.id} 
      id={item.id}
      src={item.src.large}
      isLoading={false}
      />
      
    )
    });

    return (
      <SavedPhotosContextProvider>
      <LightBox/>
      <SavedPhotos></SavedPhotos>
      <Header/>
      <div className="container">
        <div className="pictures">
          {listItems}
        </div>
      </div>
      </SavedPhotosContextProvider>
    );
  }
}



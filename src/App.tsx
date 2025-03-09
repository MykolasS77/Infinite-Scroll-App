import { createClient} from "pexels";
import { useContext, useEffect, useState} from "react";
import {SavedPhotosContext} from "./imageContext"
import ImageComponent from "./imageComponent";
import Header from "./header";
import LightBox from "./lightBoxComponent";
import SavedPhotos from "./savedPhotos";
import "./App.css"

export default function App() {
  
  const client = createClient(
    "tIdg0aIl0BHqckWvn7Uw4OlxrtmPJOnRSvL71vmRTBicZ20QZtZhnkb1"
  );

  const context = useContext(SavedPhotosContext)
  const data = context.data
  const setData = context.setData
  const [pageNumber, setPageNumber] = useState(1)

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

      if(item.alt === ""){
        const name = item.url.split("/photo")[1].split("-").slice(0,-1)
        const nameString = name.join(' ').replace("/", "")
        const formatedName = nameString.charAt(0).toUpperCase() + nameString.slice(1) + "."

        return (
          <ImageComponent
          key={item.id} 
          id={item.id}
          author={item.photographer}
          imageName={formatedName}
          src={item.src}
          isLoading={false}
          wholeData={item}
          />
      
        )
        
        
      }
      else{

      return (
      <ImageComponent
      key={item.id} 
      id={item.id}
      author={item.photographer}
      imageName={item.alt}
      src={item.src}
      isLoading={false}
      wholeData={item}
      />
  
    )
  }
    });

    return (
      <>
      <LightBox/>
      <SavedPhotos></SavedPhotos>
      <Header/>
      <div className="container">
        <div className="pictures">
          {listItems}
        </div>
      </div>
      </>
     
    );
  }
}



import { useContext, useEffect, useState} from "react";
import {SavedPhotosContext} from "./imageContext"
import ImageComponent from "./imageComponent";
import Header from "./header";
import LightBox from "./lightBoxComponent";
import SavedPhotos from "./savedPhotos";
import "./App.css"

export default function App() {
  const context = useContext(SavedPhotosContext)
  const data = context.data
  const setData = context.setData
  const [pageNumber, setPageNumber] = useState(1) 


  async function fetchPhotos(link: string){
  
    const imageRequest = await fetch(
      link,
      {
        headers: {
          Authorization: "tIdg0aIl0BHqckWvn7Uw4OlxrtmPJOnRSvL71vmRTBicZ20QZtZhnkb1",
        },
      },
    ).then((response) => response.json());


    const responseArray = imageRequest.photos
    console.log(link)

    if(data.length === 0) {
      
      console.log("request", "data 0", link)
      setData(responseArray)
    
    }
    else{
      console.log("request")
      setData((prev) => [...prev, ...responseArray])
  }
 
  }


  useEffect(() => {
 
    const scrollCheck = ()=> {
      if(document.documentElement.scrollTop + 1 + window.innerHeight > document.documentElement.scrollHeight){
            
        setPageNumber((prev) => {
        return prev + 1
      })
 
  };
    }

    window.addEventListener("scroll",scrollCheck)

    return () => {
      window.removeEventListener("scroll", scrollCheck); 
    };
 
  }, []);

  useEffect(() => {
 
    fetchPhotos(`https://api.pexels.com/v1/curated/?page=${pageNumber}&per_page=80`)
    
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



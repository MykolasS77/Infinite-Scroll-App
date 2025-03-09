import "./App.css"
import { useContext, useEffect, useRef} from "react";
import {SavedPhotosContext} from "./imageContext"
import ImageComponent from "./imageComponent";


export default function SavedPhotos() {

    const context = useContext(SavedPhotosContext)
    const savedPhotos = context.savedPhotos
    const show = context.showSaved
    const setShow = context.setShowSaved
    let lightBoxRef = useRef(null)

    const listItems = savedPhotos.map((item) => {

        
         if(item.alt === ""){
                const name = item.url.split("/photo")[1].split("-").slice(0,-1)
                const nameString = name.join(' ').replace("/", "")
                const formatedName = nameString.charAt(0).toUpperCase() + nameString.slice(1) + "."
        
                return (
                  <ImageComponent
                  type="saved"
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
              type="saved"
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

    useEffect(() => {

        let handler = (event: MouseEvent) => {
                      
            if (lightBoxRef.current === event.target) {
                
                setShow(false)
            }
        }
        
        document.addEventListener("mousedown", handler)
        
        return () => {
            document.removeEventListener("mousedown", handler);
        };
            
    }, [])
   
    if(show === true){
        return(
            <div className="container lightbox" ref={lightBoxRef}>
                <div className="savedPhotos">
                {listItems}
                </div>
            </div>
        )
    }
    
}
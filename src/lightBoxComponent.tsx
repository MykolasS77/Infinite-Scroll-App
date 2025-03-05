import "./App.css"
import { useContext, useEffect, useRef } from "react";
import {SavedPhotosContext} from "./Context"


export default function LightBox() {
    const context = useContext(SavedPhotosContext)
    const display = context.setShowPicture
    let lightBoxRef = useRef(null)

    useEffect(() => {

        let handler = (event: any) => {
            
            if (lightBoxRef.current === event.target) {
                display(false)
            }
        }
        
        document.addEventListener("mousedown", handler)
            
    }, [])
   
    if(context.showPicture === true){
        return(
            <div className="lightbox" ref={lightBoxRef}>
            <img className="active" src={context.pictureURL}></img>
            </div>
        )
    }

    
}
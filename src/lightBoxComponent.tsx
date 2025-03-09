import "./App.css"
import { useContext, useEffect, useRef, useState } from "react";
import {SavedPhotosContext} from "./imageContext"


export default function LightBox() {
    const context = useContext(SavedPhotosContext)
    const [loading, setLoading] = useState("loading")
    const display = context.setShowPicture
    let lightBoxRef = useRef(null)

    const loadHandler = () => {
        setLoading("fade-in")
        
    }

    useEffect(() => {

        let handler = (event: MouseEvent) => {
            
            if (lightBoxRef.current === event.target) {
                display(false)
            }
        }
        
        
        document.addEventListener("mousedown", handler)

        return () => {
            document.removeEventListener("mousedown", handler);
        };
            
    }, [])
   
    if(context.showPicture === true){
        return(
            <div className="lightbox" ref={lightBoxRef}>
            <img className={loading} id="active" src={context.pictureURL} onLoad={loadHandler}></img>
            </div>
        )
    }

    
}
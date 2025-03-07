import "./App.css"
import { useContext, useEffect, useRef, useState } from "react";
import {SavedPhotosContext} from "./imageContext"


export default function LightBox() {
    const context = useContext(SavedPhotosContext)
    const display = context.setShowPicture
    let lightBoxRef = useRef(null)
    const [loading, setLoading] = useState("loading")
    const loadHandler = () => {
        setLoading("fade-in")
        
       
    }

    console.log(context.pictureURL)

    useEffect(() => {

        let handler = (event: any) => {
            
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
import "./App.css"
import { useContext, useEffect, useRef } from "react";
import {SavedPhotosContext} from "./Context"


export default function SavedPhotos() {
    const context = useContext(SavedPhotosContext)
    const savedPhotos = context.savedPhotos
    const show = context.showSaved
    const setShow = context.setShowSaved
    
    const display = context.setShowPicture
    let lightBoxRef = useRef(null)

    console.log(show)
   
        const listItems = savedPhotos.map((item) => {
    
            return <img src={item}></img>
        });

        console.log(listItems)
    

    useEffect(() => {

        let handler = (event: any) => {
            console.log("click")
            
            if (lightBoxRef.current === event.target) {
                setShow(false)
            }
        }
        
        document.addEventListener("mousedown", handler)
            
    }, [])
   
    if (show === true && savedPhotos.length != 0){
        return(
            <div className="container lightbox" ref={lightBoxRef}>
            <div className="savedPhotos">
            {listItems}
            </div>
            </div>
        )
    }
    

    
}
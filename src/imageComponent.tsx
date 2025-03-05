import { useEffect, useState, useRef } from "react"
import "./App.css"
import { useContext } from "react"
import {SavedPhotosContext} from "./Context"


export default function imageComponent(props: any){

    const [loading, setLoading] = useState("loading")
    const [blur, setBlur] = useState("")
    

    const context = useContext(SavedPhotosContext)
    const items = context.savedPhotos
    const setItems = context.setSavedPhotos
    const displayedPicture = context.pictureURL
    const setPictureURL = context.setPictureURL
    const displayOn = context.setShowPicture

    
    const loadHandler = () => {
        setLoading("fade-in")
       
    }

    const hooverHandler = (event: any) => {
        setBlur("hoover")
       
    }

    const leaveHandler = (event: any) => {
        setBlur("")
       
    }

    const savePhoto = () => {

        console.log("click")

        if(items.length === 0) {
           
            setItems([props.src.large])
          }
          else{
            const newArray = [...items, props.src.large]
            console.log(newArray)
            setItems(newArray)
          }
        

    }

    const displayPhoto = () => {
    
        setPictureURL(props.src.large)
        displayOn((prevState) => !prevState)
        
       
    }

       
        return(
            <div className={blur} onMouseEnter={hooverHandler} onMouseLeave={leaveHandler} >
            {blur === "hoover" ? <button onClick={savePhoto}>Save</button> : null}
            <img key={props.id} className={loading} src={props.src.large} height={"300px"} loading="lazy" onLoad={loadHandler} onClick={displayPhoto}>
            </img>
            </div>
            
        )
    

    
 
    
} 
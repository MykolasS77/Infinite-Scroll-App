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
    const setPictureURL = context.setPictureURL
    const displayOn = context.setShowPicture

    
    const loadHandler = () => {
        setLoading("fade-in")
       
    }

    const hooverHandler = () => {
        setBlur("hoover")
       
    }

    const leaveHandler = () => {
        setBlur("")
       
    }

    const savePhoto = () => {

        

        if(items.length === 0) {
           console.log(props.src)
            setItems([props.src])
            
          }
          else{
            const newArray = [...items, props.src]
            const filteredArray = [...new Set(newArray)];
            window.localStorage.setItem("saved_photos", JSON.stringify(filteredArray))
            setItems(filteredArray)
          }
        

    }

    const displayPhoto = () => {
    
        setPictureURL(props.src) 
        displayOn((prevState) => !prevState)
        
       
    }

    const deletePhoto = () => {
        const newList = items.filter(a => a !== props.src)
        setItems(newList);
        window.localStorage.setItem("saved_photos", JSON.stringify(newList))
        
    }

 

        if (props.type === "saved"){
            console.log(props.src, "src")
            return(
                <div className={blur} onMouseEnter={hooverHandler} onMouseLeave={leaveHandler} >
                {blur === "hoover" ? <button onClick={deletePhoto}>Delete</button> : null} 
                <img key={props.id} src={props.src} height={"300px"} loading="lazy" onClick={displayPhoto}/>
                </div>
                
            )
        }
        else{
        return(
            <div className={blur} onMouseEnter={hooverHandler} onMouseLeave={leaveHandler} >
            {blur === "hoover" ? <button onClick={savePhoto}>Save</button> : null} 
            <img key={props.id} className={loading} src={props.src} height={"300px"} loading="lazy" onLoad={loadHandler} onClick={displayPhoto}/>
            </div>
            
        )
    }
    

    
 
    
} 
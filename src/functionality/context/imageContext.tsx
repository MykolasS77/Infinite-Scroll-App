import { createContext, useState } from 'react';
import { Photos } from "pexels";

type SavedPhotosContextType = {
    data: Photos["photos"] | [],
    setData: React.Dispatch<React.SetStateAction<Photos["photos"]>>,
    savedPhotos: Photos["photos"] | [],
    setSavedPhotos:  React.Dispatch<React.SetStateAction<Photos["photos"]>>
    pictureURL: string,
    setPictureURL:  React.Dispatch<React.SetStateAction<string>>
    showPicture: boolean,
    setShowPicture:  React.Dispatch<React.SetStateAction<boolean>>
    showSaved: boolean,
    setShowSaved:  React.Dispatch<React.SetStateAction<boolean>>

    
}

const SavedPhotosContext = createContext<SavedPhotosContextType>(
    {
        data: [],
        setData: () => {},
        savedPhotos: [],
        setSavedPhotos: () => {},
        pictureURL: "",
        setPictureURL: () => {},
        showPicture: false,
        setShowPicture: () => {},
        showSaved: false,
        setShowSaved: () => {},
    }
);



const SavedPhotosContextProvider = (props: { children: React.ReactNode }) => {
    
    const [data, setData] = useState<Photos["photos"] | []>([]);
    const saved = JSON.parse(window.localStorage.getItem("saved_photos") || "[]")
    const [savedPhotos, setSavedPhotos] = useState<Photos["photos"] >(saved);
    const [pictureURL, setPictureURL] = useState("empty")
    const [showPicture, setShowPicture] = useState(false)
    const [showSaved, setShowSaved] = useState(false)

    

    return(
        <SavedPhotosContext.Provider value={{data, setData, savedPhotos, setSavedPhotos, pictureURL, setPictureURL, showPicture, setShowPicture, showSaved, setShowSaved}}>
            {props.children}
        </SavedPhotosContext.Provider>
    )
}

export {SavedPhotosContext, SavedPhotosContextProvider}
import { createContext, useState } from 'react';

type SavedPhotosContextType = {
    savedPhotos: string[] | [],
    setSavedPhotos:  React.Dispatch<React.SetStateAction<string[]>>
    pictureURL: string,
    setPictureURL:  React.Dispatch<React.SetStateAction<string>>
    showPicture: boolean,
    setShowPicture:  React.Dispatch<React.SetStateAction<boolean>>
    showSaved: boolean,
    setShowSaved:  React.Dispatch<React.SetStateAction<boolean>>

    
}

const SavedPhotosContext = createContext<SavedPhotosContextType>(
    {
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

    const [savedPhotos, setSavedPhotos] = useState<string[]>([]);
    const [pictureURL, setPictureURL] = useState("empty")
    const [showPicture, setShowPicture] = useState(false)
    const [showSaved, setShowSaved] = useState(false)

    

    return(
        <SavedPhotosContext.Provider value={{savedPhotos, setSavedPhotos, pictureURL, setPictureURL, showPicture, setShowPicture, showSaved, setShowSaved}}>
            {props.children}
        </SavedPhotosContext.Provider>
    )
}

export {SavedPhotosContext, SavedPhotosContextProvider}
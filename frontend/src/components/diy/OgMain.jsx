import React from "react";
import ImageUploadForm from "./App";
import CameraCapture from "./photo";
const ogApp =()=>{
    return (
        <div>
            
            <CameraCapture />
            <ImageUploadForm/>
        </div>
    );
}

export default ogApp;
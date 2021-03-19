import React from 'react'; 
import './FaceRecognition.css'

const FaceRecognition = ({ ImageUrl,box }) =>{
    return(
        <div className='center ma'>
            <div className="absolute mt2" className="relative">
                <img id='inputimage' alt='' src = {ImageUrl} width="500px" height="auto"/>
                <div className='bounding-box' 
                style={{
                top: box.topRow, 
                right: box.rightCol,
                bottom: box.bottomRow,
                left: box.leftCol,
                // width : box.rightCol-box.leftCol,
                // height : box.bottomRow-box.topRow 
                
            }}
                ></div>
            </div>    
        </div>
    )
}
export default FaceRecognition; 
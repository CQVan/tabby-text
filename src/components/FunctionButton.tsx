import { MouseEventHandler } from "react";
import { Tooltip } from "react-tooltip";

interface Props{
    src : string
    alt : string
    onClick? : MouseEventHandler
}

function FuntionButton({src, alt, onClick} : Props){
    return(
        <>
            <button className="function-select" onClick={onClick}>
                <img className="function-images" src={src} alt={alt}/>
            </button>
        </>
    );
}

export default FuntionButton;
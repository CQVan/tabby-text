

interface Props {
    file : string
    onFileSelect : Function
}

function FileButton({file, onFileSelect} : Props){

    return(
        <button className="file-select" onClick={() => {onFileSelect(file)}}>{file}</button>
    );
}

export default FileButton;
import FileButton from "./FileButton";
import folder_open from '../assets/folder-open.svg'
import floppy_disk from '../assets/floppy-disk.svg'
import plus_solid from '../assets/plus-solid.svg'

function Sidebar(){

    return (
        <div className="sidebar">
            <div className="m-4 mb-2 flex flex-row flex-shrink justify-center gap-2 h-16">
                <button className="function-select"><img className="function-images" src={plus_solid} alt="new"/></button>
                <button className="function-select"><img className="function-images" src={floppy_disk} alt="save"/></button>
                <button className="function-select"><img className="function-images" src={folder_open} alt="open"/></button>
            </div>
            
            
            <div className="bg-gray-600 shadow-md h-fit mx-4 rounded-t-lg">
                <h1 className="directory-label">Directory Here</h1>
            </div>

            <div className="bg-gray-600 shadow-md h-full mx-4 rounded-b-lg mb-5 overflow-y-auto ">
                <ul>
                    <li> <FileButton file="test.txt" onFileSelect={(f : string) => console.log(f)}/> </li>
                    <li> <FileButton file="not_a_text_file.txt" onFileSelect={(f : string) => console.log(f)}/> </li>
                    <li> <FileButton file="shwartzs_lost_script.txt" onFileSelect={(f : string) => console.log(f)}/> </li>

                </ul>
            </div>

        </div>
        
        
    );
}


export default Sidebar;
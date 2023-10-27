import FileButton from "./FileButton";
import FunctionButton from "./FunctionButton";

import folder_open from '../assets/folder-open.svg'
import floppy_disk from '../assets/floppy-disk.svg'
import plus_solid from '../assets/plus-solid.svg'

import { open, save } from '@tauri-apps/api/dialog';
import {readDir, writeTextFile} from '@tauri-apps/api/fs'
import { useEffect, useState } from "react";

interface Props{
    onFileSelect : Function
    onSave : Function
}

function Sidebar({onFileSelect, onSave} : Props){

    const [cur_dir, setCurDir] = useState<string>("Select Directory")
    const [files_list, setFileList] = useState<string[]>([]);

    async function HandleDirectoryChange(){
        try {
            const selectedPath = await open({
                directory: true,
                multiple: false,
                title:"Open Directory"
            }) as string;

            if(!selectedPath) return;

            setCurDir(selectedPath);

            const files : string[] = (await readDir(selectedPath)).map(entry => entry.name).filter(file => file?.indexOf(".") !== -1) as string[]

            setFileList(files);
        } catch (error) {
            console.error(error);
        }
    }

    async function onNew(){
        const new_file_path = await save({
            filters:[{
                name : 'new file',
                extensions : ['txt', 'json', 'yml', 'md']
            }]
        }) as string

        await writeTextFile(new_file_path, '');

        const split_path = new_file_path.split('\\')
        split_path.pop();

        let new_dir : string = '';

        split_path.forEach(folder => {
            new_dir += folder + "\\"
        });

        setCurDir(new_dir)

        const files : string[] = (await readDir(new_dir)).map(entry => entry.name).filter(file => file?.indexOf(".") !== -1) as string[]
        setFileList(files);
    }

    return (
        <div className="sidebar">
            <div className="m-4 mb-2 flex flex-row flex-shrink justify-center gap-2 h-16">
                <FunctionButton src={floppy_disk} alt="Save" onClick={() => {onSave()}} />
                <FunctionButton src={plus_solid} alt="New" onClick={() => {onNew()}} />
                <FunctionButton src={folder_open} alt="Open" onClick={HandleDirectoryChange} />
            </div>
            
            <div className="bg-gray-600 shadow-md h-fit mx-4 rounded-t-lg">
                <h1 className="directory-label">{cur_dir}</h1>
            </div>

            <div className="bg-gray-600 shadow-md h-full mx-4 rounded-b-lg mb-5 overflow-y-auto overflow-x-clip">
                <ul>
                    {files_list.map((file : string) => <li key={file}> <FileButton file={file} onFileSelect={(f : string) => {onFileSelect(f, cur_dir)}}/> </li>)}
                </ul>
            </div>

        </div>
        
        
    );
}


export default Sidebar;
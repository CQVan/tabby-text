import { readTextFile, writeTextFile } from '@tauri-apps/api/fs';
import {appWindow} from '@tauri-apps/api/window'
import './App.css';
import Sidebar from './components/Sidebar';
import { useEffect, useState } from 'react';


function App() {

  const [text_value, setText] = useState<string>("");
  const [cur_file, setCurFile] = useState<string>("");

  useEffect(() => {
    function onKeyDown(e : KeyboardEvent){
      if(e.ctrlKey && e.key === 's'){
        onSave();
      }
    }
    document.addEventListener('keydown', onKeyDown, false)

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cur_file, text_value]);

  

  async function onSave(){
    console.log(cur_file);

    if(!cur_file || cur_file === '') return;

    await writeTextFile(cur_file, text_value);
  }

  async function onFileSelect(file : string, dir : string){
    const selected_file = dir + '\\' +file
    appWindow.setTitle("Tabby Text (" + file + ")");
    setCurFile(selected_file);
    setText(await readTextFile(selected_file))
  }

  return (
    <div className='flex flex-row' >
     
      <Sidebar 
        onFileSelect={(f: string, dir: string) => {onFileSelect(f, dir)}} 
        onSave={onSave}
      />

      <textarea className='editor-field' value={text_value} onChange={(e) => {setText(e.target.value)}} />

    </div>
  );
}

export default App;

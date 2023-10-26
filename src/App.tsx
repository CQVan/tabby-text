import './App.css';
import Sidebar from './components/Sidebar';
import { useEffect, useState } from 'react';


function App() {

  const [text_value, setText] = useState<string>("");

  useEffect(() => {

    document.addEventListener('keydown', onKeyDown, false)

  }, []);

  function onKeyDown(e : KeyboardEvent){
    if(e.ctrlKey && e.key === 's'){
      console.log("save");
    }
  }

  return (
    <div className='flex flex-row' >
     
      <Sidebar />

      <textarea className='editor-field' value={text_value} onChange={(e) => {setText(e.target.value)}} />

    </div>
  );
}

export default App;

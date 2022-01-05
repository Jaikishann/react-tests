import logo from './logo.svg';
import { useEffect, useRef } from 'react';
import './App.css';
import './record-button';
import RecordingManager from './recordingManager';
import RecordButton from './record-button';

// console.log(recordbutton);


function App() {
  // const record = new RecordButton('testname');
  const recordRef = useRef();
  const recording = new RecordingManager({ callback: (e) => {
    console.log('got event in app');
    console.log(e);
  }})
  const recordButton = recording.getRecordButton({ color: 'white'});
  // record.addEventListener('RecordingStarted', (e) => {
  //   console.log(`Got event`);
  //   console.log(e);
  // })
  useEffect(() => {
    recordRef.current.appendChild(recordButton);
  })
  // useEffect(() => {
  //   recordRef.current.addEventListener('RecordingStarted', (e) => {
  //     console.log(`Got event`);
  //     console.log(e);
  //   })
  //   const event = new Event('testEvent', {'tes': 'helloworld'});
  //   recordRef.current.dispatchEvent(event)
  // }, [])
  // const but = <button></button>

  // console.log(record);
  // console.log(but);
  // console.log(typeof record);
  // console.log(typeof but)
  // const RecordBtn = new RecordButton();
  return (
    <div className="App">
        {/* <RecordBtn /> */}
        <div ref={recordRef}></div>
    </div>
  );
}

export default App;

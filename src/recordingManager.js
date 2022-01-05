import RecordButton from "./record-button";

class RecordingManager {
  constructor(config) {
    console.log(config);
    this.config = config
  }

  addListeners() {
    this.recordButton.addEventListener('RecordingStarted', (e) => {
      console.log('Got event');
      console.log(e)
      this.config.callback(e);
    })
    this.recordButton.sendMessage('testMessage');
  }

  getRecordButton(styles) {
    console.log(styles);
    this.recordButton = new RecordButton(styles);
    this.addListeners();
    console.log(this.recordButton);
    return this.recordButton;
  }

}

export default RecordingManager
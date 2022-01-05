const buttonTemplate = document.createElement('template');
buttonTemplate.innerHTML = `
<button> create recording </button>
`;

class RecordButton extends HTMLElement {
  constructor(styles) {
    super();
    console.log(styles);
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(buttonTemplate.content.cloneNode(true));
  }

  emitRecordingStartedEvent() {
    const customEvent = new CustomEvent('RecordingStarted', {
      detail: {test: 1, hello: 2},
      bubbles: true,
    })
    this.dispatchEvent(customEvent);
  }

  sendMessage(message) {
    console.log(`got message ${message}`);
  }

  connectedCallback() {
    this.shadowRoot.addEventListener('click', (e) => {
      console.log('got click event');
      console.log(e);
      console.log(this.getAttribute('styles'));
      this.emitRecordingStartedEvent();
    });
  }
}

customElements.define('record-button', RecordButton)

export default RecordButton;
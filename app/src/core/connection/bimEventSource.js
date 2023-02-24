import { DEFAULT_BASE_URL, API_VERSION, API_SSE_ENDPOINT } from "./constants";
const events_url = `${DEFAULT_BASE_URL}/${API_VERSION}/${API_SSE_ENDPOINT}`
var __events = null;//new EventSource(events_url);

class BimEventSource {
  initListener() {
    if (!__events) {
      __events = new EventSource(events_url, { withCredentials: true });
      __events.onopen = (e) => console.log("open");

      __events.onerror = (e) => {
        if (e.readyState == EventSource.CLOSED) {
          console.log("close");
        } else {
          console.log(e);
        }
        this.initListener();
      };
      __events.onmessage = (e) => {
        console.log(e);
      }
    }
    return __events;
  }

  subscribe(onMessage) {
    const events = this.initListener();
    console.log(events);
    events.addEventListener('message', onMessage)
  }
}

const bimEventSource = new BimEventSource();

export default bimEventSource;

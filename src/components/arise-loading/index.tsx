import React from "react";
import ReactDOM from "react-dom";
import Loading from "./loading";

let container: any = null,
  loading: any = null,
  duration = 200;
export default {
  mask: false,
  Element: Loading,
  config ({ mask=false }) {
    this.mask = mask;
  },

  show (loadingParams?:any) {
    if(container) return;
    const loadingText = loadingParams?.loadingText;
    container = document.createElement("div");
    container.className = "i-loading";
    document.body.appendChild(container);
    ReactDOM.render(<Loading mask={this.mask} visible={true} loadingText={loadingText}/>, container, function () {
     loading = this;
    });
  },

  hide () {
    if(!container) return;
    loading && loading.addEnterStyle();
    window.setTimeout( () => {
      container && ReactDOM.unmountComponentAtNode(container);
      container && document.body.removeChild(container)
      container = null;
    }, duration);
  },
}

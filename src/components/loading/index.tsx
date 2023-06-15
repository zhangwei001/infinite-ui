import React from "react";
import ReactDOM from "react-dom";
import Loading from "./loading";

let container: any = null,
  loading: any = null,
  duration = 200;
export default {
  mask: true,
  Element: Loading,
  config ({ mask=true }) {
    this.mask = mask;
  },

  show () {
    if(container) return;
    container = document.createElement("div");
    container.className = "i-loading";
    document.body.appendChild(container);
    ReactDOM.render(<Loading mask={this.mask} visible={true}/>, container, function () {
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

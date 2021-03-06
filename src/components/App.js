import React from "react";
import qs from "qs";

import LoadingOverlay from "./shared/LoadingOverlay";

class App extends React.Component {
  componentDidMount() {
    console.log('componentDidMount()')
    window.addEventListener("hashchange", this.watchHash);
    this.watchHash();
  }
  componentWillUnmount() {
    console.log('componentWillUnmount()')
    window.removeEventListener("hashchange", this.watchHash);
  }
  watchHash = () => {
    console.log('watchHash()')
    const { serviceId } = this.props;
    if(!serviceId)
      return;
    const hash = window.location.hash.slice(1);
    if(hash) {
      const params = qs.parse(hash);
      if(params["access_token"]) {
        const jwt = params["access_token"];
        this.props.verifyCredentials(serviceId, jwt);
        window.history.pushState(
          "",
          document.title, window.location.pathname + window.location.search
        );
      }
    }
  }
  render() {
    console.log('App.render()')
    return (<div>
      {this.props.children}
      <LoadingOverlay loading={this.props.isLoading} />
    </div>)
  }
}

export default App;

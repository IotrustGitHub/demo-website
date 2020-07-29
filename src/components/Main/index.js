import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { showAppDownload } from "../../selectors";
import Basic from "./Basic";
import qs from 'qs'
import webauthn from '../../webauthn/webauthn-client'

class Main extends React.Component {
  state = {
    isUserExist: false
  }

  constructor(props) {
    super(props)
    const location = window.location
    const query = qs.parse(location.search, {ignoreQueryPrefix: true})
    const userid = query.userid
    console.log('userid = ', userid)
    webauthn.checkUserExists(userid).then((isUserExist) => {
      console.log('isUserExist = ', isUserExist)
      this.setState({
        isUserExist: isUserExist
      })
    })
  }

  render() {
    if (this.state.isUserExist) {
      return (<Wrapper>
      </Wrapper>)
    } else {
      return (<Wrapper>
        <Basic />
      </Wrapper>)
    }
  }
}

const Wrapper = styled.div`
  ${props => props.extraPadding
    ? `padding-bottom: 6rem;`
    : ""}
`;

const mapStateToProps = state => ({
  showAppDownload: showAppDownload(state)
});

export default connect(mapStateToProps)(Main);

import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { showAppDownload } from "../../selectors";
import Basic from "./Basic";
import Signin from "./Signin";
import Signup from "./Signup";
import qs from 'qs'
import webauthn from '../../webauthn/webauthn-client'

class Main extends React.Component {
  state = {
    userid: undefined,
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
        userid: userid,
        isUserExist: isUserExist
      })
    })
  }

  render() {
    console.log('this.state.userid = ', this.state.userid)
    if (typeof this.state.userid === "undefined") {
      return (<Wrapper>
        <Basic />
      </Wrapper>)
    } else if (this.state.isUserExist) {
      return (<Wrapper>
        <Signin userid={this.state.userid} />
      </Wrapper>)
    } else {
      return (<Wrapper>
        <Signup userid={this.state.userid} />
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

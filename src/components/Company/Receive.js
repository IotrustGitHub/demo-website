import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";

import * as theme from "../shared/theme";
import { Container } from "../shared/grid";
import Card from "../shared/ContentCard";
import { Button } from "../shared/elements";
import isValid from "../../utils/validateCityIdInfo";
import SuccessIcon from "../../images/smiley-face.svg";
import AttestationModal from "../uport/AttestationContainer";
import Logo from "../../images/company-logo.png";

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attestationModal: false
    };
  }
  componentDidMount() {
    if(!this.props.isLoggedIn) {
      this.props.redirectToEmploymentHome();
    } else if(!isValid(this.props.cityIdClaim).valid) {
      this.props.redirectToEmploymentRequirement();
    }
  }
  hideAttestationModal = () => {
    this.setState({
      attestationModal: false
    });
    this.props.redirectToEmploymentReceived();
  }
  showAttestationModal = () => {
    this.setState({
      attestationModal: true
    });
  }
  render() {
    const { attestationModal } = this.state;
    const { cityIdClaim, isLoggedIn } = this.props;
    if(!isLoggedIn || !isValid(cityIdClaim).valid)
      return null;
    const CTA = () => (<Card.CTA>
      <Button className="long" secondary onClick={this.showAttestationModal}>
        Receive your Employment Verification
      </Button>
    </Card.CTA>);

    return (<Wrapper>
      <Card CTA={CTA}>
        <h2>Good News!</h2>
        <p>Your claims were succesfully shared with Dream Job LLC.</p>
        <SuccessImage src={SuccessIcon} />
        <hr />
        <h4>What’s next?</h4>
        <p>
          Let’s make sure you have an access to your employment claims whenever
          and wherever you need them. Dream Job LLC. is going
          to send your new claims to your uPort app.
        </p>
      <AttestationModal
        heading="Check your device"
        description="Tap 'Accept' in your uPort app to receive your claims"
        infoHeading="You're Interacting with..."
        issuer={{
          heading: "Employment Verification",
          subHeading: "Dream Job LLC.",
          name: "Dream Job LLC.",
          logo: Logo
        }}
        infoDetails={[{
          heading: "Issued Date",
          name: (new Date()).toDateString()
        }]}
        claimDetails={[{
          name: "Company Name",
          value: "Dream Job LLC.",
        }, {
          name: "Salary",
          value: "$100,000",
        }, {
          name: "Date of Employment",
          value: dayjs().format("MM/DD/YYYY"),
        }]}
        show={attestationModal}
        onClose={this.hideAttestationModal}
        claim={{
          "Employment": {
            "Company Name": "Dream Job LLC.",
            "Salary": "$100,000",
            "Date of Employment": dayjs().format("MM/DD/YYYY")
          }
        }} />
      </Card>
    </Wrapper>)
  }
}

const Wrapper = styled.div`
  ul {
    list-style: disc;
    margin-left: 20px;
    li + li {
      margin-top: 15px;
    }
  }
`;
const SuccessImage = styled.img`
  display: block;
  margin: 40px auto 0;
`;

export default Landing;
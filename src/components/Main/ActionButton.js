/* eslint react/jsx-no-target-blank: 0 */

import React from "react";
import { withTranslation } from "react-i18next";

import { CapsuleButton, CapsuleLinkButton } from "../shared/elements";

class ActionButton extends React.Component {
  constructor(props) {
    super(props)
    console.log('ActionButton.props = ', props)
  }
  render() {
    const { t } = this.props;
    if (this.props.isLogin) {
      return <CapsuleLinkButton to="/start">{t("Get Started")}</CapsuleLinkButton>
    } else {
      return <CapsuleButton onClick={this.props.onClick}>{this.props.label}</CapsuleButton>
    }
  }
}


export default withTranslation()(ActionButton);


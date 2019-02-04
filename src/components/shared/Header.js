import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import * as theme from "../shared/theme";
import { Container } from "../shared/grid";

class Header extends React.Component {
  render() {
    const { logo, title } = this.props;
    return (<Wrapper>
      <Container>
        <Link to="/" className="home-link">
          <Logo src={logo} alt={title} />
          <h1>{title}</h1>
        </Link>
        <Separator />
      </Container>
    </Wrapper>)
  }
}

const Wrapper = styled.header`
  background-color: ${theme.header.bg};
  color: ${theme.header.textColor};
  padding: 10px 0;

  a {
    color: inherit;
    text-decoration: none;
  }

  .home-link {
    align-items: center;
    display: flex;
  }
  h1 {
    font-size: 1.125rem;
    font-weight: 600;
    margin-left: 20px;
  }

  ${Container} {
    position: relative;
  }
`;
const Logo = styled.img`
  border-radius: 15px;
  max-height: 60px;
`;
const Separator = styled.div`
  border-top: solid 1px ${theme.header.separatorColor};
  bottom: 0;
  height: 1px;
  left: 80px;
  position: absolute;
  right: 0;
`;

export default Header;

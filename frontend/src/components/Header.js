import React from "react";
import styled from "styled-components";
import logo from "../resources/images/logo.png";

function Header() {
  const Header = styled.div`
    overflow: hidden;
    background-color: #ffffff;
    padding: 10px 10px;
    border-bottom: 1px solid #0A2435;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);

    .img{
        height: 2rem;
    }

    a {
      float: left;
      color: black;
      text-align: center;
      padding: 8px;
      text-decoration: none;
      font-size: 12px;
      line-height: 25px;
      border-radius: 10px;
    }

    .home{
        background-color: #0A2435;
        color: white;
        margin-right: 10px;
        border: 1px solid #0A2435;

    }

    .about-us{
        background-color: FAF9F6;
        color: #0A2435;
        border: 1px solid #0A2435;
    }

    a:hover {
      background-color: #009ADF;
      color: white;
      border: 1px solid #009ADF;
    }


    .header-right {
      float: right;
    }

    @media screen and (max-width: 500px) {
      a {
        float: none;
        display: block;
        text-align: left;
      }

      .header-right {
        float: none;
      }
    }
  `;

  return (
    <Header>
      <img alt="Medcloud Logo" src={logo} class="img"></img>
      <div class="header-right">
        <a class="home" href="#home">Home</a>
        <a class="about-us" href="https://medcloud.link/" target="_blank" rel="noopener noreferrer" >About US</a>
      </div>
    </Header>
  );
}

export default Header;
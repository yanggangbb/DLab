import { useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Header = ({ theme, openSideCtrl }) => {
  const openSideHandler = () => {
    openSideCtrl();
  };

  return (
    <>
      <Wrap style={{ backgroundColor: ` ${theme ? "transparent" : "white"} ` }}>
        <HeaderWrap
          style={{ borderBottom: ` 1px solid ${theme ? "white" : "black"} ` }}
        >
          <Link to={"/"}>
            <MenuImg
              src={
                theme
                  ? "../src/assets/img/LogoWhite.png"
                  : "../src/assets/img/LogoBlack.png"
              }
              alt="로고"
            />
          </Link>

          <MenuImg
            onClick={openSideHandler}
            src={
              theme
                ? "../src/assets/img/hamburgerWhite.png"
                : "../src/assets/img/hamburgerBlack.png"
            }
            alt="햄버거 버튼"
          />
        </HeaderWrap>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 80px;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 1000;
`;

const HeaderWrap = styled.div`
  width: 95%;
  height: 100%;
  padding: 0px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
`;

const MenuImg = styled.img`
  height: 40px;
  &:hover {
    cursor: pointer;
  }
`;

export default Header;

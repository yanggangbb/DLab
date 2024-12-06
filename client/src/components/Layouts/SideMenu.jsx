import { useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SideMenu = ({ openSide, openSideCtrl, openPopup }) => {
  const SideWrap = useRef(null);

  const openSideHandler = (e) => {
    openSideCtrl();
    console.log(e.target.classList.contains("AIpop"));
    if (e.target.classList.contains("AIpop")) {
      console.log("afds");
      openPopup();
    }
  };

  useEffect(() => {
    console.log(openSide);
    if (openSide) {
      SideWrap.current.setAttribute(
        "style",
        `transform:translateX(-${SideWrap.current.offsetWidth}px);)`
      );
    } else {
      SideWrap.current.setAttribute("style", `transform:translateX(0px);)`);
    }
  }, [openSide]);

  return (
    <>
      <Wrap ref={SideWrap}>
        <RemoveButton>
          <img
            onClick={openSideHandler}
            src="../src/assets/img/remove.png"
            alt=""
          />
        </RemoveButton>
        <MenuList>
          <Link to={"/apply"} onClick={openSideHandler}>
            <MenuItem>실습실 신청</MenuItem>
          </Link>
          <Link onClick={openSideHandler}>
            <MenuItem className="AIpop">AI 기반 실습실 추천</MenuItem>
          </Link>
          <Link to={"/machineApply"} onClick={openSideHandler}>
            <MenuItem>노트북/태블릿 대여</MenuItem>
          </Link>
          <Link to={"/check"} onClick={openSideHandler}>
            <MenuItem>신청조회</MenuItem>
          </Link>
        </MenuList>
        <Footer>
          <div>
            <Label>주소</Label>
            <Introduce>서울특별시 용산구 회나무로12길 27</Introduce>
          </div>
          <div>
            <Label>연락처</Label>
            <Introduce>010-8390-0538</Introduce>
          </div>
          <div>
            <Label>E-mail</Label>
            <Introduce>sdh230406@sdh.hs.kr</Introduce>
          </div>
          <div>
            <Label>저작정보</Label>
            <Introduce>Copyright ⓒ 2024 EvE All Rights Reserved</Introduce>
          </div>
        </Footer>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  width: 350px;
  height: 100vh;
  background-color: black;
  position: fixed;
  top: 0;
  right: -450px;
  z-index: 1000;
  padding: 0px 50px;
  transition: all 0.5s ease-in-out;
`;

const RemoveButton = styled.div`
  width: 100%;
  height: 80px;

  display: flex;
  justify-content: end;
  align-items: center;
  & > img:hover {
    cursor: pointer;
  }
`;

const MenuList = styled.div`
  width: 90%;
  margin: 50px 0px;
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  gap: 50px;
`;

const MenuItem = styled.div`
  font-size: 30px;
  color: white;
  font-family: "Noto Sans KR", serif;
  width: 100%;
  width: 350px;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const Footer = styled.div`
  width: 100%;
  padding: 20px 0px;
  display: flex;
  justify-content: center;
  align-items: end;
  flex-direction: column;
  background-color: #212121;
  position: absolute;
  left: 0;
  bottom: 0;
  gap: 10px;
  & > div {
    margin: 0px 20px;
    display: flex;
    gap: 5px;
    font-size: 15px;
  }
`;

const Label = styled.span`
  color: #e4e4e4;
`;
const Introduce = styled.span`
  color: #848484;
`;
export default SideMenu;

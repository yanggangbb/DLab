import styled from "styled-components";
import { useState } from "react";
import LabtopApplySide from "../components/Layouts/LabtopApplySide";
import TablitApplySide from "../components/Layouts/TablitApplySide";
import MachineApplyPopup from "../components/Layouts/MachineApplyPopup";

const MachineApplyPage = () => {
  const [openLabtop, setOpenLabtop] = useState(false);

  const openApplyLabtop = () => {
    setOpenLabtop(!openLabtop);
  };

  const [openTablit, setOpenTablit] = useState(false);

  const openApplyTablit = () => {
    setOpenTablit(!openTablit);
  };

  const [openPop, setOpenPop] = useState(false);
  const openPopup = () => {
    setOpenPop(!openPop);
    console.log("adfssadf");
  };

  return (
    <>
      <Wrap>
        <div
          style={{
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          대여를 원하는 기기를 선택해주세요
        </div>
        <ImgWrap>
          <ApplyWrap>
            <img
              onClick={openApplyLabtop}
              src="../src/assets/img/labtop.png"
              alt=""
            />
            <LabtopApplySide openPopup={openPopup} openBool={openLabtop} />
          </ApplyWrap>
          <ApplyWrap>
            <img
              onClick={openApplyTablit}
              src="../src/assets/img/tablit.png"
              alt=""
            />
            <TablitApplySide openPopup={openPopup} openBool={openTablit} />
          </ApplyWrap>
        </ImgWrap>
        <MachineApplyPopup openBool={openPop} openPopup={openPopup} />
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: calc(100vh - 80px);
  background-color: #fefefe;
  position: relative;
  top: calc(100vh - (100vh - 80px));
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow-x: hidden;
  gap: 100px;
  position: relative;
  & > div:nth-child(1) {
    position: absolute;
    top: 100px;
  }
`;
const ImgWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
const ApplyWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  & > img {
    transition: all 0.5s ease-in-out;
    height: 350px;
    border-radius: 10px;
  }
  & > img:hover {
    transform: translateY(-10px);
    box-shadow: 0px 5px 5px 5px #90909083;
  }
`;

export default MachineApplyPage;
